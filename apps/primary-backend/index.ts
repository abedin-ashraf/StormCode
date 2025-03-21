import { prismaClient } from "db/client";
import express from "express";
import cors from "cors";
import { use } from "react";
import { authMiddleware } from "./middleware";

const app = express();

app.use(express.json());
app.use(cors());


// for creating a project
app.post("/project", authMiddleware, async (req, res) => {
    const { prompt } = req.body;
    const userId = req.userId!;

    //TODO: add logic to get a useful name for the project from the prompt

    const description = prompt.split("\n")[0];

    const project = await prismaClient.project.create({
        data: { description, userId }
    });

    res.json({ projectId: project.id });
});

app.get("/projects", authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const project = await prismaClient.project.findFirst({
        where: { userId },
    })
    res.json(project);
})

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})