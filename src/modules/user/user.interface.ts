import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const UserSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    img: { type: String },
    age: { type: String },
    social: {
        instagram: { type: String },
        facebook: { type: String },
        twitch: { type: String },
        youtube: { type: String },
    },
    badges: [{ type: String }],
    stakers: [{ type: String }],
    score: { w: { type: String }, l: { type: String }, d: { type: String } },
    nickname: { type: String, unique: true },
    ranking: [{ type: String }],
    access: { type: String },
    tournament: [
        { tornament: { type: String }, totalScore: { type: String }, results: { type: String } },
    ],
    evo: { type: String },
    wallet_id: { type: String },
    registro: { type: Date, default: Date.now },
},{ collection: 'user' });

UserSchema.plugin(mongoosePaginate);

export interface User extends mongoose.Document {
    id: string,
    user: string,
    password: string,
    name: string,
    img: string,
    age: string,
    social: {
        instagram: string,
        facebook: string,
        twitch: string,
        youtube: string,
    },
    badges: [string],
    stakers: [string],
    score: [{ w: string, l: string, d: string }],
    nickname: string,
    ranking: [string],
    access: string,
    tournament: [{ tornament: string, totalScore: string, results: string }],
    evo: string,
    wallet_id: string,
    registro: Date,
}
mongoose.model("User", UserSchema);