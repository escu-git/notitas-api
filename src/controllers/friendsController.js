const FriendRequest = require('../models/friends/friendRequest');
const Friendship = require('../models/friends/friendships');

const friendsController = {
    getAllFriends: async (req, res) => {
        try {
            const user = req.user?.email;
            const query = Friendship.where({ 
                $or: [
                    { user1: user },
                    { user2: user }
                ],
                active: true
             })
            const friends = await query.find({})

            // const formattedResponse = friends.map(x=>{
            //     return {
            //         x.user = req.user.email == x.user1 ? x.user1 : x.user2
            //     }
            // })
            res.status(200).send({ message: "Friends found", data: friends, status: 200 })
        } catch (err) {
            res.status(400).send({ message: "Could not find friends", error:err, status: 400 });
        }
    },
    getFriendById: async (req, res) => {
        try {
            const data = req.body;
            const query = Friendship.where({ _id: data.id })
            const friend = await query.find({})
            res.status(200).send({ message: "Friend found", data: friend, status: 200 })
        } catch (err) {
            res.status(400).send({ message: "Could not find friend", error:err, status: 400 });

        }
    },
    getFriendRequests: async (req, res) => {
        try {
            const user = req.user?.email;
            const query = FriendRequest.where({ receiver: user, status: "pending" })
            const friends = await query.find({})
            res.status(200).send({ message: "Friend requests found", data: friends, status: 200 })
        } catch (err) {
            res.status(400).send({ message: "Could not find friends request", error:err, status: 400 });

        }
    },
    sendFriendRequest: async (req, res)=>{
        try{
            const data = req.body;
            const friendRequest = new FriendRequest({
                sender: req.user.email,
                receiver: data.receiver,
                status: "pending"
            })
            friendRequest.save()
            .then(friendRequestData=>res.status(200).send({message:"Friend request sent", data: friendRequestData, status:200}));
        }
        catch(error){
            res.status(400).send({message:"Friend request could not be sent", error:error, status:400})
        }
    },
    acceptFriendRequest: async (req, res)=>{
        try{
            const data = req.body;
            const friendRequest = await FriendRequest.findByIdAndUpdate(data.id, {
                status: "accepted",
                connected: true
            })
            friendRequest.save()
            .then(res=>{
                if(res.connected == true){
                    const newFriendship = new Friendship({
                        user1: res.sender,
                        user2: res.receiver,
                        requestId:res._id,
                    })
                    newFriendship.save();
                }
            })
            .then(friendRequestData=>res.status(200).send({message:"Friend request accepted", data: friendRequestData, status:200}));
        }
        catch(error){
            res.status(400).send({message:"Friend request could not be accepted", error:error, status:400})
        }
    },
    rejectFriendRequest: async (req, res)=>{
        try{
            const data = req.body;
            const friendRequest = await FriendRequest.findByIdAndUpdate(data.id, {
                status: "rejected",
                connected:false
            })
            friendRequest.save()
            .then(friendRequestData=>res.status(200).send({message:"Friend request rejected", data: friendRequestData, status:200}));
        }
        catch(error){
            res.status(400).send({message:"Friend request could not be rejected", error:error, status:400})
        }
    },
    removeFriend: async (req, res)=>{
        try{
            const data = req.body;
            const friendship = await Friendship.findByIdAndUpdate(data.id, {
               active: false,
            })
            friendship.save()
            .then(res=>{
                if(res.active == false){
                    const friendRequest = FriendRequest.findByIdAndUpdate(res.requestId, {
                        connected: false,
                        status:"removed"
                    })
                    friendRequest.save();
                }
            })
            .then(friendRequestData=>res.status(200).send({message:"Friend removed", data: friendRequestData, status:200}));
        }
        catch(error){
            res.status(400).send({message:"Friend could not be removed", error:error, status:400})
        }
    },
    // getContactFriends: async (req, res)=>{
    //     try{
    //         const user = req.user?.email;
    //         const query = FriendRequest.where({ receiver: user, status: "accepted" })
    //         const friends = await query.find({})
    //         res.status(200).send({ message: "Friends found", data: friends, status: 200 })
    //     } catch (err) {
    //         res.status(400).send({ message: "Could not find friends", error:err, status: 400 });
    //     }
    // }
}

module.exports = friendsController;