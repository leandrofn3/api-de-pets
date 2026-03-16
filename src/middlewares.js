export const validateFields = (req, res, next) => {
    try {
        const { name, race, age, tutorsName } = req.body;
        const errors = [];

        if (!name) errors.push({ ok: false, message: "The name field is required!" });
        if (!race) errors.push({ ok: false, message: "The race field is mandatory!" });
        if (!age) errors.push({ ok: false, message: "The age field is required!" });
        if (!tutorsName) errors.push({ ok: false, message: "The tutor's name field is required!" });

        if (name === "") errors.push({ ok: false, message: "The name field cannot be empty!" });
        if (race === "") errors.push({ ok: false, message: "The field can't be left empty!" });
        if (age === "") errors.push({ ok: false, message: "The age field cannot be left blank!" });
        if (tutorsName === "") errors.push({ ok: false, message: "The tutor's name field cannot be empty!" });

        if (typeof name !== "string") errors.push({ ok: false, message: "The name field must be of type string!" });
        if (typeof race !== "string") errors.push({ ok: false, message: "The race field must be of type string!" });
        if (typeof age !== "number" || age <= 0) errors.push({ ok: false, message: "The age field must be a number and greater than zero!" });
        if (typeof tutorsName !== "string") errors.push({ ok: false, message: "The tutor's name field must be of type string!" });

        if (errors.length > 0) {
            return res.status(400).json({
                ok: false,
                message: "invalid request",
                reason: errors
            });
        };

        return next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.toString()
        });
    }
};

export const validateId = (req, res, next) => {
    try {
        const { id } = req.params;
        const errors = [];

        if (!id) errors.push({ ok: false, message: "It is mandatory to provide the ID!" });

        if (id === "") errors.push({ ok: false, message: "It is mandatory to provide the ID! ta caindo aqui!" });

        if (errors.length > 0) {
            return res.status(400).json({
                ok: false,
                message: "invalid request",
                reason: errors
            });
        };

        return next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.toString()
        });
    };
};