
const multer = require('multer');
const UserModel = require('../models/user.model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../clients/public/uploads/profil/`);
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + ".jpg");
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 150000 
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
}).single('file'); 

module.exports.uploadProfil = (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
               
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'Image depasse 150ko' });
                }

                if (err.code === 'LIMIT_FILE_TYPE') {
                    return res.status(400).json({ error: 'Format incompatible' });
                }           
                
                return res.status(400).json({ error: err.message });
            } else if (err) {
               
                return res.status(500).json({ error: err.message });
            }
          
            const filename = req.body.name + ".jpg";
    
            const pushPicture = await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: { picture: "./uploads/profil/" + filename }
                },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        
            if (pushPicture) {
                return res.status(201).send(pushPicture);
            }
            return res.status(500).json({ error: 'Failed to update user model' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
