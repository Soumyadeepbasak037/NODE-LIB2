const express = require('express')
const ConnectionParameters = require('pg/lib/connection-parameters')
const app = express()
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 5000;
const bookfile_path = path.join(__dirname,'book.json')



app.listen(PORT,()=>{
    console.log(`listening on Port:${PORT}`)
})


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/view-books',(req,res)=>{
    try{
        const data = fs.readFileSync(bookfile_path,'utf-8');
        const books = JSON.parse(data);
        res.json(books);
    }
    catch(error){
        res.send(error);
    }
})

app.post('/add-book',(req,res)=>{
    try{
        const data = fs.readFileSync(bookfile_path,'utf-8');
        const books = JSON.parse(data);

        const new_book = {
            title:req.body.title,
            author:req.body.author,
            id:Date.now().toString(),
        }
        
        books.push(new_book);
        fs.writeFileSync(bookfile_path,JSON.stringify(books))
        res.json(new_book);
    }
    catch(error){
        res.send(error)
    }
})