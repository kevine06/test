const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config({path: './config/.env'})
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/authMiddleware')
const cors = require('cors');
const app = express();


// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }
// app.use(cors({
//     origin: "http://localhost:5173/", // Permet les requêtes depuis ce domaine
//     credentials: true, // Inclut les informations d'authentification dans les requêtes

//   }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, ( req, res) => {
    res.status(200).send(res.locals.user._id)
})


// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes)
// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})