const express = require('express')
const ConnectionParameters = require('pg/lib/connection-parameters')
const app = express()
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`listening on Port:${PORT}`)
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/view-books',(req,res)=>{
    const data = fs.readFileSync(bookfile_path,'utf-8')
})