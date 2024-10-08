import express from "express";
import User from "../models/Users";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "crypto";

const authUserRouter = express.Router();
authUserRouter.use(express.json());

authUserRouter.post( '/', async (req, res, next )=>{
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            token: randomUUID(),
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
authUserRouter.post('/sessions' , async (req, res, next) => {
    try {

        const user = await User.findOne({username: req.body.username})

        if(!user){
            return res.status(400).send({error:'User or password are wrong'})
        }

        const comparePswrd = await bcrypt.compare(req.body.password , user.password)

        if(!comparePswrd){
            return res.status(400).send({error:'User or password are wrong'})
        }

        user.token = randomUUID();

        await user.save()
        res.send(user)
    }catch (e) {
        next(e)
    }
})
export default authUserRouter;