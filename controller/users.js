import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';


export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        const userPassword = await bcrypt.compare(password, user.password)

        if (!user) {
            return res.status(404).json({message: "User dosen't exist."});
        } 

        if (!userPassword) {
            return res.status(404).json({message: "Invalid Credentials"});
        } 

        const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET, {expiresIn: "1h"});
        res.status(200).json({result: user, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const user = await User.findOne({email});

        if (user) {
            return res.status(404).json({message: "User already exist."});
        } else {
            if (password !== confirmPassword) {
                return res.status(404).json({message: "Password dont match"});
            } else {
                const hashedPassword = await bcrypt.hash(password, 12);
                const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
                const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET, {expiresIn: "1h"});
                res.status(200).json({result, token})
            }
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong'});
    }
}
