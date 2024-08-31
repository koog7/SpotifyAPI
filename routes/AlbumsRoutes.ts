import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Albums";


const AlbumsRouter = express.Router();
AlbumsRouter.use(express.json());

AlbumsRouter.post( '/albums', imagesUpload.single('photo'), async (req, res )=>{
    try {
        const ArtistObject = new Album({
            title: req.body.title,
            artistId: req.body.artistId,
            dataRelease: req.body.dataRelease,
            photo: req.file ? req.file.filename : null,
        })

        await ArtistObject.save()
        res.send(ArtistObject)
    }catch (e) {
        res.send('cant be created')
    }
});


export default AlbumsRouter;

