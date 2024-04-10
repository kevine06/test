const UserModel = require('../models/user.model')
const { signUpErrors, signInErrors } = require('../utils/erros.utils')
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60* 1000;


const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    } )
}


module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body
  
    try {
      const user = await UserModel.create({pseudo, email, password });
      res.status(201).json({ user: user._id});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }
  }
// module.exports.signIn = async (req, res) => {
//         const { email, password } = req.body;

//     try {
//          const user = await UserModel.login(email, password);
//          const token = createToken(user._id);
        
//         // Définir le cookie dans le navigateur
//         document.cookie = `jwt=${token}; domain=localhost; max-age=${maxAge}`;

//         // Rediriger ou faire toute autre action nécessaire après la connexion réussie
//         // window.location.href = "/dashboard"; // Rediriger vers un tableau de bord, par exemple
//     } catch (err) {
//         const errors = signInErrors(err);
//         res.status(400).json(errors);
//         // Gérer les erreurs d'authentification
//     }
// }

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge, domain: 'localhost', // Définissez le domaine du cookie sur localhost
        port: 5173 });
        // document.cookie = `jwt=${token}; domain=localhost; max-age=${maxAge}`;
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = signInErrors(err)
        res.status(400).json(errors);
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '' , { maxAge: 1});
    res.redirect('/');
}