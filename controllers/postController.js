const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId;
const multer = require('multer');



module.exports.readPost = (req, res) => {
    PostModel.find()
    .sort({ createdAt: -1 })
    .then(docs => res.send(docs))
    .catch(err => console.log('Error to get data :', err));
};


// create post 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../clients/public/uploads/posts/`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 150000 // Limite de taille en octets (150 Ko)
    },
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
}).single('file'); // 'file' est le nom du champ de fichier dans le formulaire HTML

module.exports.createPost = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // Si l'erreur est liée à la taille du fichier
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds the limit' });
            }
            // Autres erreurs Multer
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Autres erreurs
            return res.status(500).json({ error: err.message });
        }

        let imagePath = null;
        if (req.file) {
            imagePath = "./uploads/posts/" + req.file.filename;
        }

        const newPost = new PostModel({
            posterId: req.body.posterId,
            message: req.body.message,
            picture: imagePath,
            video: req.body.video,
            likers: [],
            comments: [],
        });

        try {
            const post = await newPost.save();
            return res.status(201).json(post);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    });
};


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
                    $addToSet: { likers: req.body.id },
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
            
    if (userLikePost && AddLikeUser) {
        res.status(201).json({ post: userLikePost, user: AddLikeUser });
    } else {
        res.status(400).send('Error to Add');
    }
} catch (err) {

    res.status(500).send(err);
}
};


module.exports.unlikePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

    try {
        // Mettre à jour le post avec le like
        const userLikePost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true }
        );

        // Mettre à jour l'utilisateur avec le like
        const AddLikeUser = await UserModel.findByIdAndUpdate(
            req.body.id,
            { 
                $pull: { likes: req.params.id }
            },
            { new: true }
        );
        
// Vérifier si les deux opérations se sont déroulées avec succès
if (userLikePost && AddLikeUser) {
    res.status(201).json({ post: userLikePost, user: AddLikeUser });
} else {
    res.status(400).send('Error to Add');
}
} catch (err) {
res.status(500).send(err);
}
}

module.exports.commentPost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

    try {
        const commenter = await PostModel.findByIdAndUpdate(
            req.params.id,
          {
            $push : {
                Comments: {
                    commenterId: req.body.commenterId,
                    commentPseudo: req.body.commentesPseudo,
                    text: req.body.text,
                    timestamp: new Date().getTime()
                }
            }
          }
        )
        if (commenter) {
            res.status(201).send(commenter)
          }
    } catch (error) {
       return res.status(400).send(error)
    }
}

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        const theComment = post.Comments.find((comment) => 
            comment._id.equals(req.body.commenterId)
        );

        if (!theComment) return res.status(404).send('Comment not found');
        theComment.text = req.body.text;

        await post.save();
        return res.status(200).send(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}


module.exports.deleteCommentPost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
    
    try {
        const deletePost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    Comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true }
        )
        if (deletePost) {
            res.send(deletePost)
        } else {
            res.send("delete post no cannot")
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}