const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema ({

    title:{
        type: String
    },
    author:{
        type: String
    },
    summary:{
        type: String
    }

})


let ContentDATA = mongoose.model('content', ContentSchema);

module.exports = ContentDATA