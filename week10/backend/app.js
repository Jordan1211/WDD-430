const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/posts', (req, res, next) => {
    const posts = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
})

app.use('/api/posts',(req, res, next) => {
    // res.send('Hello from express!');
    const posts = [
        {
        id: '65a4sdfasd',
        title: 'First server side post',
        content: 'This is comfing from the server'
        },
        {
            id: '66a3sdfasd',
            title: 'Second server side post',
            content: 'This is comfing from the server!'
        }
    ];
    res.json({
        message: 'Posts fetched succesfully!',
        posts: posts
    });
});

module.exports = app;