import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const TournamentSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    start_date: { type: String },
    end_date: { type: String },
    player: [{ type: String, unique: true }],
    jackpot_player: [{ type: String }],
    jackpot_staker: [{ type: String }],
    company: { type: String },
    rounds: [{ type: String }],
    description: { type: String },
    registro: { type: Date, default: Date.now }
}, { collection: 'tournament' });

TournamentSchema.plugin(mongoosePaginate);

export interface Tournament extends mongoose.Document {
    id: string,
    name: string,
    start_date: Date,
    player: [string],
    jackpot_player: [string],
    jackpot_staker: [string],
    company: string,
    rounds: [string],
    description: string,
    registro: Date
}
mongoose.model("Tournament", TournamentSchema);
