const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Juego = require("../models/juego");

router.get("/", (req, res, next) => {
    console.log("Intentando obtener los juegos");
    Juego.find(function (err, docs) {
        console.log('Resultado:', docs);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }

        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'No hay juegos.'
            });
        }
    });
});

router.get("/:juegoId", (req, res, next) => {

    var idd = req.params.juegoId;
    console.log('Intentando obtener el juego con id', idd);
    Juego.findOne({
        id: idd
    }, function (err, jue) {
        console.log("Resultado", jue);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }

        if (jue) {
            res.status(200).json(jue);
        } else {
            res.status(404).json({
                message: 'No hay ese juego.'
            });
        }
    });
});

router.post("/", (req, res, next) => {
    const juego = new Juego({
        _id: new mongoose.Types.ObjectId(),
        id: req.body.id,
        name: req.body.name,
        partidas: req.body.partidas,
        materias: req.body.materias,
        habilidades: req.body.habilidades
    });
    console.log('Intentando crear el juego', juego);

    juego.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /juegos",
                juegoCreado: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch("/:juegoId", (req, res, next) => {
    const idd = req.params.juegoId;
    const updateOps = {};
    Object.entries(req.body).forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        //use key and value here
        updateOps[key] = value;
    });
    // for (var ops in req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    console.log('Intentando actualizar el juego con id', idd, 'con los siguientes atributos:',updateOps);
    Juego.update({
        id: idd
    }, {
        $set: updateOps
    }, function (err, ans) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }

        if (ans) {
            console.log(ans);
            res.status(200).json(ans);
        } else {
            res.status(404).json({
                message: 'No hay respuesta de la base de datos.'
            });
        }
    });
});

router.put("/:juegoId", (req, res, next) => {
    const idd = req.params.juegoId;
    const updateOps = {};
    Object.entries(req.body).forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        //use key and value here
        updateOps[key] = value;
    });
    // for (var ops in req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    console.log('Intentando actualizar el juego con id', idd, 'con los siguientes atributos:',updateOps);
    Juego.update({
        id: idd
    }, {
        $set: updateOps
    }, function (err, ans) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }

        if (ans) {
            console.log(ans);
            res.status(200).json(ans);
        } else {
            res.status(404).json({
                message: 'No hay respuesta de la base de datos.'
            });
        }
    });
});

router.delete("/:juegoId", (req, res, next) => {
    const idd = req.params.juegoId;
    console.log('Intentando eliminar el juego con id', idd);
    Juego.remove({
        id: idd
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }else{
            console.log("Eliminado");
            res.status(200).json({
                message: 'El juego con id ' + idd + ", ha sido eliminado."
            });
        }

    });
});





module.exports = router;