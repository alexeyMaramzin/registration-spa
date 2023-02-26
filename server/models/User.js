import {Schema, model} from 'mongoose';

const User = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
export default model('User', User)
