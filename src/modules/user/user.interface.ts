import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const UserSchema = new mongoose.Schema({
    user: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    nickname: { type: String, required: false, unique: true },
    name: { type: String },
    img: { type: String },
    birth_date: { type: Date },
    social: {
        instagram: { type: String },
        facebook: { type: String },
        twitch: { type: String },
        youtube: { type: String },
    },
    badges: [{ type: String }],
    score: { type: Number},
    ranking: { type: Number },
    access: { type: Number },
    tournament: [
        { id: { type: String }, name: { type: String }, totalScore: { type: Number, default: 0 }, results: { type: Number, default: 0 } },
    ],
    wallet: { type: String },
    user_since: { type: Date, default: Date.now },
},{ collection: 'user' });

UserSchema.plugin(mongoosePaginate);

export interface User extends mongoose.Document {
    id: string,
    user: string,
    password: string,
    nickname: string,
    name: string,
    img: string,
    birth_date: Date,
    social: {
        instagram: string,
        facebook: string,
        twitch: string,
        youtube: string,
    },
    badges: [string],
    score: number,
    ranking: number,
    access: number,
    tournament: [{ id: string, name: string, totalScore: number, results: number }],
    wallet: string,
    user_since: Date,

}
mongoose.model("User", UserSchema);