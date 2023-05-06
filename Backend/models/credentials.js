const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})


let LoginDATA = mongoose.model('loginCredential', LoginSchema);

module.exports = LoginDATA  