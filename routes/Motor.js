const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const motor = require('../controller/Motor')

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    )
    cb(null, Date.now() + ext);
  },
  destination: function (req, file, cb) {
    cb(null, './gambar')
  }
})

var upload = multer({storage: storage}).single("gambar")


router.post("/inputmotor", upload, (req, res) => {
  motor.inputMotor(req.body, req.file.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datamotor", (req, res) => {
  motor.dataMotor()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datamotor/:id", (req, res) => {
  console.log(req.params.id)
  motor.detailDataMotor(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
  motor.hapusMotor(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
  let fileName;
  if (req.body.gambar) {
    fileName = req.body.gambar;
  } else {
    fileName = req.file.filename;
  }
  motor.updateMotor(req.params.id, req.body, fileName)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

module.exports = router