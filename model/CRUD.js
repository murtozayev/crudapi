import mongoose from "mongoose";

const crudThing = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const CRUD = mongoose.model('CRUD', crudThing);