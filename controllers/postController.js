const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.readPost = (req, res) => {
    PostModel.find()
    .then(docs => res.send(docs))
    .catch(err => console.log('Eroor to get data :', err));
};

module.exports.createPost = async (req, res) =>  {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updatePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

    const updateReccord = {
        message: req.body.message
    }

    try {
        const updatePost = await PostModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateReccord },
            { new: true }
        );
        if(updatePost) {
            res.status(201).send(updatePost)
        } else {
            res.status(404).send('post not found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports.deletePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

    try{
        const deletePost = await PostModel.findOneAndDelete(req.params.id)
        if(deletePost){
            res.send(deletePost);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        console.log("Delete error : " +  err);
        res.status(500).send("internal server error")
    }
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

        try {
            // Mettre à jour le post avec le like
            const userLikePost = await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likes: req.body.id },
                },
                { new: true }
            );
    
            // Mettre à jour l'utilisateur avec le like
            const AddLikeUser = await UserModel.findByIdAndUpdate(
                req.body.id,
                { 
                    $addToSet: { likes: req.params.id }
                },
                { new: true }
            );
            
    // Vérifier si les deux opérations se sont déroulées avec succès
    if (userLikePost && AddLikeUser) {
        // Si oui, envoyer une réponse avec les données mises à jour
        res.status(201).json({ post: userLikePost, user: AddLikeUser });
    } else {
        // Si l'une des opérations a échoué, envoyer une réponse avec une erreur
        res.status(400).send('Error to Add');
    }
} catch (err) {
    // Attraper toute erreur survenue pendant l'exécution des opérations
    res.status(500).send(err);
}
};


module.exports.unlikePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

}