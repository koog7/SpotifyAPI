import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Albums";
import Artist from "../models/Artists";
import ArtistsRouter from "./ArtistsRoutes";


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


AlbumsRouter.get( '/albums', async (req, res )=>{
    const {artist} = req.query;

    if(artist){
        try {
            const albums = await Album.find({artistId: artist});

            const albumInfo = albums.map(album => ({
                _id: album._id,
                title: album.title,
                dataRelease: album.dataRelease,
                photo: album.photo,
            }));

            res.send(albumInfo)
        }catch (e) {
            res.send('cant find artist')
        }
    }else {
        const albums = await Album.find();

        const albumInfo = albums.map(album => ({
            _id: album._id,
            title: album.title,
            dataRelease: album.dataRelease,
            photo: album.photo,
        }));

        res.send(albumInfo)
    }


});

export default AlbumsRouter;

