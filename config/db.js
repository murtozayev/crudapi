import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jahongirmurtozayev777:mKYDr8GecONkizOg@cluster0.xm6il.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.log(error);
    }
}