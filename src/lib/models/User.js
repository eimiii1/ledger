import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email_address: { type: String },
    password: { type: String, required: true },
    username: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
    bio: { type: String },

}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', userSchema)