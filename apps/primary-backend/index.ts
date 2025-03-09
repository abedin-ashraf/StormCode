import { prismaClient } from "db/client";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


// for creating a project
app.post("/project", async (req, res) => {
    const { prompt } = req.body;

    //TODO: add logic to get a useful name for the project from the prompt

    const description = prompt.split("\n")[0];

    const project = await prismaClient.project.create({
        data: { description }
    });

    res.json({ projectId: project.id });
});

app.get("/project/:projectId", async (req, res) => {
    const { projectId } = req.params;
    const project = await prismaClient.project.findUnique({
        where: { id: projectId },
    })
    res.json(project);
})

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})