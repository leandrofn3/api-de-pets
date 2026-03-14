import express from "express";
import * as dotenv from "dotenv";
import { pets } from "./data.js";
import {randomUUID} from "crypto";
import cors from "cors";

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

const port = process.env.PORT;
app.listen(port, () => {
    console.info(`O servidor está execultando na porta: ${port}!`);
});