import express from "express";
import {imagesUpload} from "../multer";
import Artist from "../models/Artists";

const ArtistsRouter = express.Router();
ArtistsRouter.use(express.json());

ArtistsRouter.post( '/artists', imagesUpload.single('photo'), async (req, res )=>{
    try {
        const ArtistObject = new Artist({
            name: req.body.name,
            photo: req.file ? req.file.filename : null,
            info: req.body.info ? req.body.info : null,
        })

        await ArtistObject.save()
        res.send(ArtistObject)
    }catch (e) {
        res.send('cant be created')
    }
});


export default ArtistsRouter;