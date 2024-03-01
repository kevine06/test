const router = require('express').Router();
const authController = require('../controllers/authControllers');
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadController')

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)

// user 
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unFollow)

// upload
router.post('/upload', uploadController.uploadProfil)


module.exports = router;