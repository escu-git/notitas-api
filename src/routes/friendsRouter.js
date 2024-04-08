const express = require('express');
const friendsController = require('../controllers/friendsController');
const router = express.Router();

router.get(`/getActiveFriends`,(req, res, next)=>friendsController.getAllFriends(req, res));
router.get(`/getFriendById`, (req, res, next)=>friendsController.getFriendById(req, res));
// router.get(`/getContactFriends`, (req, res, next)=>friendsController.getContactFriends(req, res));
router.get(`/getFriendRequests`, (req, res, next)=>friendsController.getFriendRequests(req, res));
router.post(`/sendFriendRequest`, (req, res, next)=>friendsController.sendFriendRequest(req, res));
router.put(`/acceptFriendRequest`, (req, res, next)=>friendsController.acceptFriendRequest(req, res));
router.put(`/rejectFriendRequest`, (req, res, next)=>friendsController.rejectFriendRequest(req, res));
router.delete(`/removeFriend`, (req, res, next)=>friendsController.removeFriend(req, res));

module.exports = router;