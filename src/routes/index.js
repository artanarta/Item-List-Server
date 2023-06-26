const express = require('express')

const router = express.Router()

//middleware
const { uploadFile } = require('../middlewares/uploadFile');
const { auth } = require('../middlewares/auth');

// Controller
const { register, login, checkAuth } = require('../controllers/auth');
const { getAllItem, additem, getIditem, updateitem, deleteitem } = require('../controllers/item')

// Route
// Login & Register
router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);

//item

router.get('/items', auth, getAllItem)
router.post('/item', uploadFile('image'), additem);
router.get('/item/:id', getIditem)
router.patch('/item/:id', uploadFile('image'), updateitem);
router.delete('/item/:id', deleteitem)

module.exports = router