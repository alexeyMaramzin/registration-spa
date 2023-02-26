import Router from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
const router = new Router();

//Registration of user
router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        // check('login', 'Incorrect login').isLength({min: 0, max: 20}),
        check('password', 'Password must be longer than 5 and shorter than 20').isLength({min: 5, max:20})
    ],
    async (req, res)=>{
    try{
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Incorrect request"});
        }
        const {email, login, password} = req.body;
        const candidate = await User.findOne({email});
        if(candidate) return res.status(400).json({message: `User with Email ${email} already exist`})
        const hashPassword = await bcrypt.hash(password, 6);
        const user = new User({
            email,
            login,
            password: hashPassword
        });
        await user.save();
        return res.json({message: "User has been created"});
    }
    catch(e){
        console.log(e);
        res.send({message: "Error"});
    }
})
//Authorization of user
router.post('/login',
    async (req, res)=>{
        try{
            const {login, password} = req.body;
            console.log(req.body);
            const user = await User.findOne({login});
            console.log(user);
            if(!user) {
                return res.status(404).json({message: "User is not exist"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if(!isPassValid){
                return res.status(400).json({message: "Wrong password"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"}, ()=>{})
            return res.json({
                token,
                user:{
                    id: user.id,
                    email: user.email,
                    login: user.login
                }
            })
        }
        catch(e){
            console.log(e);
            res.send({message: "Error"});
        }
    })
export default router