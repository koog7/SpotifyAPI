import express from "express";
import Track from "../models/Tracks";

const AlbumsRouter = express.Router();
AlbumsRouter.use(express.json());

AlbumsRouter.post( '/tracks', async (req, res )=>{
    try {
        const TrackObject = new Track({
            title: req.body.title,
            albumId: req.body.albumId,
            duration: req.body.duration,
        })

        await TrackObject.save()
        res.send(TrackObject)
    }catch (e) {
        res.send('cant be created')
    }
});


export default AlbumsRouter;
