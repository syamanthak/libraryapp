const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://syamanthak:syama123%40@cluster0.3iyogwr.mongodb.net/?retryWrites=true&w=majority')

.then(()=>{
    console.log('-------mongodb connected successfully-------')
})
.catch((error)=>{
    console.log(error.message)
}) 