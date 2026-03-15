import express from "express";
import * as dotenv from "dotenv";
import { pets } from "./data.js";
import { randomUUID } from "crypto";
import cors from "cors";
import { validateFields } from "./middlewares.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    console.info("Bem-vindo a API de Pets!");

    res.status(200).send({
        ok: true,
        messagem: "Rota execultada com sucesso!"
    });
});

app.post("/pets", [validateFields], (req, res) => {
    try {
        const { name, race, age, tutorsName } = req.body;

        const newPet = {
            id: randomUUID(),
            name: name.trim(),
            race: race.trim(),
            age: Number(age),
            tutorsName: tutorsName.trim()
        };

        pets.push(newPet);

        return res.status(201).json({
            ok: true,
            message: "pet created successfully",
            data: newPet
        });

    } catch (error) {
        return res.send(500).json({
            ok: false,
            message: error.toString()
        });
    };
});

const port = process.env.PORT;
app.listen(port, () => {
    console.info(`O servidor está execultando na porta: ${port}!`);
});