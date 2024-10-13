const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;
const bookfile_path = path.join(__dirname, 'book.json');

app.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/view-books', (req, res) => {
    try {
        const data = fs.readFileSync(bookfile_path, 'utf-8');
        const books = JSON.parse(data);
        res.json(books);
    } catch (error) {
        res.send(error);
    }
});

app.post('/add-book', upload.none(), (req, res) => {
    try {
        const data = fs.readFileSync(bookfile_path, 'utf-8');
        const books = JSON.parse(data);

        const new_book = {
            title: req.body.title,
            author: req.body.author,
            id: Date.now().toString(),
        };

        books.push(new_book);
        fs.writeFileSync(bookfile_path, JSON.stringify(books));
        res.redirect('/');
    } catch (error) {
        res.send(error);
    }
});


app.get('/cls', (req, res) => {
    try {
        const default_book = [{
            title:"Default",
            author:"Default",
            id:1
        }]
        fs.writeFileSync(bookfile_path, JSON.stringify(default_book));
        res.send("Book Data Cleared");
    } catch (error) {
        res.send(error);
    }
});
