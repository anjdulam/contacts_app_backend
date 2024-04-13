const express = require('express');
const app= express();
const dotenv = require('dotenv').config();
const port=process.env.PORT || 5000;   //static port that we rae ging 
const errorHandler=require('./middleware/errorHandler');
const connectDb = require('./dbconnection/dbConnection');

connectDb();
//wrong coding practice cuz u shouldnt define routes in server.js
// app.get('/api/contacts', (req,res) => {
//     //res.send("get all contacts");
//     res.json({"message" : "get all contacts"});
// })

//middleware to parses the express data as json 
app.use(express.json());   
//uisng app.use() middleware 
app.use('/api/contacts',require('./routes/contactRoutes'));
//error handler middleware 
app.use(errorHandler);





app.listen(port,() => {
    console.log(`Server listening to port ${port}`)
});
