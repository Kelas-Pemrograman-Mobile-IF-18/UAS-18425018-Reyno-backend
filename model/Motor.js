const mongoose = require('mongoose');

const motorScema = mongoose.Schema({
    namaMotor: {
        type: String
    },
    tipeMotor: {
        type: String
    },
    warnaMotor: {
        type: String
    },
    hargaMotor: {
        type: String
    },
    gambar: {
        type: String
    }
})

module.exports = mongoose.model( 'motor', motorScema)