const motor = require('../model/Motor')
const  response = require('../config/response.js')
const { updateOne } = require('../model/Motor')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputMotor = (data, gambar) =>
  new Promise(async (resolve, reject) => {
    
    const motorBaru = new motor({
      namaMotor: data.namaMotor,
      tipeMotor: data.tipeMotor,
      warnaMotor: data.warnaMotor,
      hargaMotor: data.hargaMotor,
      gambar: gambar
    })

    await motor.findOne({namaMotor: data.namaMotor})
      .then(motor => {
        if (motor) {
          reject(response.commonErrorMsg('Nama Motor Sudah Digunakan'))
        } else {
          motorBaru.save()
            .then(r => {
              resolve(response.commonSuccessMsg('Berhasil Input Data'))
            }).catch(err => {
              reject(response.commonErrorMsg('Maaf Input Data Gagal'))
            })
        }
      }).catch(err => {
        reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
    })

  })

exports.dataMotor = () =>
  new Promise(async (resolve, reject) => {
    await motor.find({})
      .then(result => {
        resolve(response.commonResult(result))
      }).catch(() => reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami')))
  })

exports.detailDataMotor= (namaMotor) =>
  new Promise(async (resolve, reject) => {
    await motor.findOne({namaMotor: namaMotor})
      .then(result => {
        resolve(response.commonResult(result))
      }).catch(() => reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami')))
  })

exports.updateMotor = (id, data, gambar) =>
  new Promise(async (resolve, reject) => {
    await motor.updateOne(
      {_id : ObjectId(id)},
      {
        $set: {
          namaMotor: data.namaMotor,
          tipeMotor: data.tipeMotor,
          warnaMotor: data.warnaMotor,
          hargaMotor: data.hargaMotor,
          gambar: gambar
        }
      }
    ).then(motor => {
      resolve(response.commonSuccessMsg('Berhasil Update Data'))
    }).catch(err => {
      reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
    })
  })

exports.hapusMotor = (_id) =>
  new Promise(async (resolve, reject) => {
    await motor.remove({_id: ObjectId(_id)})
      .then(() => {
        resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
      }).catch(() => {
        reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
      })
  })