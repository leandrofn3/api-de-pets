import express from "express";
import * as dotenv from "dotenv";
import { pets } from "./data.js";
import { randomUUID } from "crypto";
import cors from "cors";
import { validateFields, validateId } from "./middlewares.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {

    res.status(200).json({
        ok: true,
        message: "Welcome to the pets API!"
    });
});

app.post("/pets", [validateFields], (req, res) => {
    try {
        const { name, race, age, tutorsName } = req.body;

        const newPet = {
            id: randomUUID(),
            name: name.trim(),
            race: race.trim(),
            age: age,
            tutorsName: tutorsName.trim()
        };

        pets.push(newPet);

        return res.status(201).json({
            ok: true,
            message: "pet created successfully",
            data: newPet
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.toString()
        });
    };
});

app.get("/pets", (req, res) => {
    try {
        return res.status(200).json({
            ok: true,
            message: "Pets successfully listed!",
            data: pets
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.toString()
        });
    };
});

app.get("/pets/:id", (req, res) => {
    try {
        const { id } = req.params;

        const pet = pets.find(i => { return i.id === id });

        if (!pet) {
            return res.status(404).json({
                ok: false,
                message: "pet not found!"
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Pet successfully found!",
            data: pet
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.toString()
        });
    }
});

app.put("/pets/:id", [validateFields, validateId], (req, res) => {
    try {
        const { id } = req.params;
        const { name, race, age, tutorsName } = req.body;

        const pet = pets.find(i => { return i.id === id });

        if (!pet) {
            return res.status(404).json({
                ok: false,
                message: "pet not found!"
            });
        };

        pet.name = name.trim();
        pet.race = race.trim();
        pet.age = age.trim();
        pet.tutorsName = tutorsName.trim();

        return res.status(200).json({
            ok: true,
            message: "Pet updated successfully!",
            data: pet
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.toString()
        });
    };
});

app.delete("/pets/:id", [validateId], (req, res) => {
    try {
        const { id } = req.params;

        const acharId = pets.findIndex(i => { return i.id === id });

        if (acharId === -1) {
            return res.status(404).json({
                ok: false,
                message: "ID not found!"
            });
        };

        const petDelete = pets.splice(acharId, 1);

        return res.status(200).json({
            ok: true,
            message: "Pet successfully deleted!",
            data: petDelete
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.toString()
        });
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.info(`The server is running on port: ${port}!`);
});