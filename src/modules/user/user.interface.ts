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
    stakers: [{ type: String }],
    score: { w: { type: Number, default: 0 }, l: { type: Number, default: 0 }, d: { type: Number, default: 0 } },
    ranking: [{ type: String }],
    access: { type: Number },
    tournament: [
        { tornament: { type: String }, totalScore: { type: Number }, results: { type: Number } },
    ],
    evo: 
        { ein: { type: String }, address: { type: String }, state : { type: String } }
    ,
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
    stakers: [string],
    score: [{ w: number, l: number, d: number }],
    ranking: [string],
    access: number,
    tournament: [{ tornament: string, totalScore: number, results: number }],
    evo: { ein: string, address: string, state: string },
    wallet: string,
    user_since: Date,

}
mongoose.model("User", UserSchema);