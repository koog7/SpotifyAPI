import express from "express";
import User from "../models/Users";
import mongoose from "mongoose";

const authUserRouter = express.Router();
authUserRouter.use(express.json());

authUserRouter.post( '/users', async (req, res, next )=>{
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        })

        await user.save()
        res.send(user)
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            return res.status(400).send(e)
        }
        return next(e)
    }
});

export default authUserRouter;