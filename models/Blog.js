import mongoose, { Schema, model } from 'mongoose';

const blogSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default model("blog", blogSchema)