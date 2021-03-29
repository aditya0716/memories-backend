import mongoose from 'mongoose';
import PostMessage from '../models/posts.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();

        if (posts) {
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No post with that Id')
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}

export const deletepost = async (req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No post with that Id')
        }
        await PostMessage.findByIdAndDelete(id);
        res.json({message: "Pos deleted Succeddfully"});
    } catch (error) {
        console.log(error);
    }
} 

export const likepost = async (req, res) => {
    const {id} = req.params;
    
    if (!req.userId) return res.json({message: "Unauthenticated"})

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No post with that Id')
        }

        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}