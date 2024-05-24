import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route to get all books form db
router.get('/',async (request, response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
             data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//ROute for gettin one book by id

router.get('/:id',async (request, response)=>{
    try{

        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route fo r updating a book

router.put('/:id', async (req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, autho, publisher',
            });
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message:'Book updated successfully'});

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for deleting  a book
router.delete('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: "Book not found"});
        }

        res.status(200).send({message:"Book deleted Succefully"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;
