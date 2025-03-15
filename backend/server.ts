import express from "express";
import prisma from "./prisma.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});