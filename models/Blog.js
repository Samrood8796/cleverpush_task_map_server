import mongoose, { Schema, model } from 'mongoose';

const blogSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
    },
    author:{
        type:String
    },
    cover: {
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default model("blog", blogSchema)