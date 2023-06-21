import mongoose, { model } from "mongoose";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    status: {
        type: String,
    },
    profile: {
        type: String,
    },
    location:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
export default model('users',userSchema)