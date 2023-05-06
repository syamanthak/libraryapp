const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = new express();

require('./middlewares/mongoDB')


const LoginDATA = require('./models/credentials');
const ContentDATA = require('./models/contents')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

const PORT = 2003;


// -----------------LOGIN API -----------------
app.post('/api/login', async(req, res)=>{
    try {
        let mail = req.body.data.email
        let pass = req.body.data.password
        const list = await LoginDATA.find({email:mail})

        if(mail=='' && pass==''){
            res.send({"status":"-1"})  // empty values
        }
        else if(list == ""){
            res.json({"status":"0"}) // account doesn't exist
        }
        else if(list[0].email == mail && list[0].password != pass){  // email correct . password wrong
            res.send({"status":"2"})
        }
        else{
            res.send({"status":"1"}) // login success
        }       
 
    } catch (error) {
        
        console.log(error)  

    } 

})


// signup
app.post('/api/signup', async(req, res)=>{

    try {
        
        
        let item = req.body.data  // to fetch and save data from frontend in server
        console.log("backend",item)
        let mail = item.email
        let pass = item.password
        const list = await LoginDATA.find({email:mail}) // checking the entered email is already exist or not
        console.log(list)
        if(list == "" && mail != '' && pass != ''){
            const newUser = new LoginDATA(item)  // checking incoming data with schema
            const savedUser = await newUser.save()  // saving to db
            res.json({"status":"1"})                // signup success
        }    
        else if(mail == '' || pass == ''){
            res.json({"status":"2"})
        }    
        else{
            res.json({"status":"0"})                // email already exists
        }
        

        // res.send(savedUser) 

    } catch (error) {
        console.log(error)
        res.json({"status":"2"})
    }

})


// Books



// post a new book
app.post('/api/book', async(req, res)=>{

    try {
        
        console.log(req.body)
        let item ={  // to fetch and save data from frontend in server
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary
        } 
        
        const newBook = new ContentDATA(item)  // checking incoming data with schema
        const savedBook = await newBook.save()  // saving to db

        res.send(savedBook)

    } catch (error) {
        console.log(error)
    }

})


// get all books
app.get('/api/book', async(req, res)=>{
    try {
        
        const list = await ContentDATA.find()
        // console.log(list[0])
        // res.send(list[0])
        console.log(list)
        res.send(list)         
 
    } catch (error) {
        
        console.log(error) 

    }

})

// get single book
app.get('/api/book/:id', async(req, res)=>{
    try {
        
        let id = req.params.id
        const singleBook = await ContentDATA.findById(id)

        res.send(singleBook)

    } catch (error) {
        console.log(error.message)
    } 


}) 


// edit an existing book
app.put('/api/book/:id',async(req, res)=>{

    try {
         
        let id = req.params.id
        console.log('put id from url:',id)
        console.log('edited from body:',req.body)
        let datas = req.body.data
        // let datas = {}
        let updateBook = await ContentDATA.findOneAndUpdate({_id : id},datas,{new : true})

        res.send(updateBook)
        console.log('updated book:',updateBook)

    } catch (error) {
        console.log(error) 
    }
 
} ) 

// delete book
app.delete('/api/book/:id', async(req, res)=>{

    try {

        let id = req.params.id
        console.log("id in backend",id)
        const deletedBook = await ContentDATA.findByIdAndDelete(id)
        res.send(deletedBook)
        
    } catch (error) {
        console.log(error)

    }

})

const path = require('path'); 

app.use(express.static(`./dist/frontend`));

app.get(`/*`, function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));

}); 





// server

app.listen(PORT, ()=>{
    console.log(`----------Server is running on port ${PORT}----------------`)
}) 