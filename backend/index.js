import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow all Origins with defauld of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins this is prefered
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','PUT','POST','DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );

app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`)
});

app.use('/books',booksRoute);


// HEre the server will anyways connect 
// But I want it to connect only if the db is connected
// So let's put this inside the mongoose.connect
// app.get('/',(request, response) => {
//     console.log(request)
//     return response.status(234).send("Welcome to MERN stack tutorial");
// });


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected successfully to db");
    app.get('/',(request, response) => {
        console.log(request)
        return response.status(234).send("Welcome to MERN stack tutorial");
    });
}).catch((error)=>{
    console.log(error);
});

