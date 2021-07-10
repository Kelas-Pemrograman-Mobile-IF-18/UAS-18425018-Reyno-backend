const mongoose = require('mongoose');

const userScema = mongoose.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    namaLengkap: {
        type: String
    },
    alamat: {
        type: String
    },
    role: {
        type: Number
    }
})

module.exports = mongoose.model( 'user', userScema)