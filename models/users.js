import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('Users', userSchema);
export default User;