const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id)

    UserModel.findById(req.params.id).select('-password').exec()
    .then(docs => {
        if (docs) {
            res.send(docs);
        } else {
            console.log('ID unknown');
            res.status(404).send('User not found');
        }
    })
    .catch(err => {
        console.log('Error retrieving user:', err);
        res.status(500).json({ error: 'Internal server error' });
    });  
}

module.exports.updateUser = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id)

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { bio: req.body.bio } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        if (updatedUser) {
            res.status(201).send(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    

};

module.exports.deleteUser = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id)

     try {
        await UserModel.deleteMany({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. "});
     } catch (err) {
        return res.status(500).json({message: err});
     }
}

module.exports.follow = async (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        // add to the following list
        const userToUpdate = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow}},
            { new: true, upsert: true}
        );

        // add to the followers list
        const userToFollow = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id}},
            { new: true, upsert: true}
        );

        return res.status(201).json({ userToUpdate, userToFollow });
    } catch (err) {
        return res.status(500).json(err);
    }
}


module.exports.unFollow = async (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
    return res.status(400).send('ID unknown :' + req.params.id)

    try {
        // add to the following list
        const userToUpdate = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow}},
            { new: true, upsert: true}
        );

        // add to the followers list
        const userToFollow = await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id}},
            { new: true, upsert: true}
        );

        return res.status(201).json({ userToUpdate, userToFollow });
    } catch (err) {
        return res.status(500).json(err);
    }
}