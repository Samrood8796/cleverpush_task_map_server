import mongoose, { Schema, model } from 'mongoose';

const locationSchema = Schema({
    lng: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model("locations", locationSchema)