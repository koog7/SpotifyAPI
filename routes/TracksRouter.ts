import express from "express";
import Track from "../models/Tracks";

const TracksRouter = express.Router();
TracksRouter.use(express.json());

TracksRouter.post( '/tracks', async (req, res )=>{
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

TracksRouter.get( '/tracks', async (req, res )=>{
    const {album} = req.query;

    if(album){
        try {
            const tracks = await Track.find({albumId: album});

            const trackInfo = tracks.map(album => ({
                _id: album._id,
                title: album.title,
                duration: album.duration,
            }));

            res.send(trackInfo)
        }catch (e) {
            res.send('cant find artist')
        }
    }else {
        const tracks = await Track.find();

        const trackInfo = tracks.map(album => ({
            _id: album._id,
            title: album.title,
            duration: album.duration,
        }));

        res.send(trackInfo)
    }


});

export default TracksRouter;
