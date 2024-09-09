import express from "express"
import { connectDB } from "./config/db.js"
import cors from "cors"
import { CRUD } from "./model/CRUD.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
    try {
        const allThing = await CRUD.find({})
        res.json(allThing)
    } catch (error) {
        res.json("Add one thing")
    }
})

app.post("/add", async (req, res) => {
    const { text } = req.body

    if (!text) {
        res.json("Add something")
    }

    const newThing = new CRUD({ text })

    try {
        const savedThing = await newThing.save()

        res.status(201).json({ success: true, data: savedThing })

    } catch (error) {
        res.status(400).json({ success: false, message: "Bad request" })
    }
})

app.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        await CRUD.findByIdAndDelete(id)
        res.json({ success: true, message: "Text removed" })
    } catch (error) {
        res.json({ success: false, message: "Bad request" })
    }
})

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const text = req.body
    try {
        const changed = await CRUD.findByIdAndUpdate(id, text, { new: true, runValidators: true });

        if (!changed) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, data: changed });
    } catch (error) {
        res.status(400).json({ success: false, message: "Update failed", error: error.message });
    }
});


connectDB()

export default app