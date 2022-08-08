const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// Handling cors error
app.use(cors())
const port = 3000;

// connect to db
mongoose.connect("mongodb://localhost:27017/studentDB", { useNewUrlParser: true, useUnifiedTopology: true })

// body-parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const usersRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');

app.use('/users', usersRoutes);
app.use('/students', studentRoutes);


// Error Handling
app.use((req, res, next) =>
{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>
{
    res.status(error.status || 500);
    res.send(error.message)
})

// just checking for all
app.get('/', (req, res) =>
{
    res.send('Welcome to student API')
})

// running on port 3000 
app.listen(port, () =>
{
    console.log(`Listening on port ${port}`)
})