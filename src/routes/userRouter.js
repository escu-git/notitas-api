const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get(`/`, (req, res)=> userController.getUserById(res));
router.get(`/ex`, (req, res)=>{

})

module.exports = router;