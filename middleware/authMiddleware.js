const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt',   '' , { maxAge: 1 });
                next()
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next()
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
    
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error(err); // Affiche l'erreur dans la console
                res.status(401).json({ message: 'Unauthorized' }); // Envoie une réponse 401 Unauthorized
            } else {
                console.log(decodedToken.id);
                req.user = decodedToken; // Ajoute l'objet decodedToken à la requête pour qu'il soit disponible dans les middlewares suivants
                next();
            }
        });
    } else {
        console.log('No token');
        res.status(401).json({ message: 'Unauthorized' }); // Envoie une réponse 401 Unauthorized
    }
};
