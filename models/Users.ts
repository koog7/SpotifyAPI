import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    }
})

const User = mongoose.model('User' , UsersSchema);
export default User;