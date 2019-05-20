const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Habilidad = require("../models/habilidad");

router.get("/", (req, res, next) => {
    console.log("Intentando obtener las habilidades");
    Habilidad.find(function (err, docs) {
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
                message: 'No hay habilidades.'
            });
        }
    });
});

router.get("/:habilidadId", (req, res, next) => {

    var idd = req.params.habilidadId;
    console.log('Intentando obtener la habilidad con id:', idd);
    Habilidad.findOne({
        id: idd
    }, function (err, hab) {
        console.log("Resultado:", hab);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }

        if (hab) {
            res.status(200).json(hab);
        } else {
            res.status(404).json({
                message: 'No hay esa habilidad.'
            });
        }
    });
});

router.post("/", verifyToken, (req, res, next) => {

    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else if(isNotAdmin(authData)) {
            console.log(authData);
            res.status(403).json({'error': 'NO es usuario admin'});
        } else {
            const habilidad = new Habilidad({
                _id: new mongoose.Types.ObjectId(),
                id: req.body.id,
                nameEn: req.body.nameEn,
                nameEs: req.body.nameEs,
                shortName: req.body.shortName,
                img: req.body.img,
                descEn: req.body.descEn,
                descEs: req.body.descEs,
                juegos: req.body.juegos,
                materias: req.body.materias
            });
            console.log('Intentando crear la habilidad', habilidad);
        
            habilidad.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Handling POST requests to /habilidads",
                        habilidadCreada: result,
                        authData
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });

});

router.patch("/:habilidadId", verifyToken, (req, res, next) => {

    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else if(isNotAdmin(authData)) {
            console.log(authData);
            res.status(403).json({'error': 'NO es usuario admin'});
        } else {
                const idd = req.params.habilidadId;
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
                console.log('Intentando actualizar la habilidad con id', idd, 'con los siguientes atributos:',updateOps);
                Habilidad.update({
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
                        res.status(200).json({ans, authData});
                    } else {
                        res.status(404).json({
                            message: 'No hay respuesta de la base de datos.'
                        });
                    }
                });
        }
    });
});

router.put("/:habilidadId", verifyToken, (req, res, next) => {

    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else if(isNotAdmin(authData)) {
            console.log(authData);
            res.status(403).json({'error': 'NO es usuario admin'});
        } else {
            const idd = req.params.habilidadId;
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
            console.log('Intentando actualizar la habilidad con id', idd, 'con los siguientes atributos:',updateOps);
            Habilidad.update({
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
                    res.status(200).json({ans,authData});
                } else {
                    res.status(404).json({
                        message: 'No hay respuesta de la base de datos.'
                    });
                }
            });
        }
    });

});

router.delete("/:habilidadId", verifyToken, (req, res, next) => {
    
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else if(isNotAdmin(authData)) {
            console.log(authData);
            res.status(403).json({'error': 'NO es usuario admin'});
        } else {
            const idd = req.params.habilidadId;
            console.log('Intentando eliminar la habilidad con id', idd);
            Habilidad.remove({
                id: idd
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }else{
                    console.log("Eliminada");
                    res.status(200).json({
                        message: 'La habilidad con id ' + idd + ", ha sido eliminada",
                        authData
                    });
                }
        
            });
        }
    });
    
});

// FORMAT OF TOKEN
// Authorization: Team01 <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}

//Verify that the user trying to change the data is an admin:
function isNotAdmin(authData){
    const adminField = authData['user']['isAdmin'];
    return (adminField==null || adminField==undefined);
}





module.exports = router;