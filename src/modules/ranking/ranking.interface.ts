import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const RankingSchema = new mongoose.Schema({
  name: { type: String },
  description: {type:String},
  players: [{ type: String }],
  rounds: [{ type: String }],
  registro: { type: Date, default: Date.now },
}, { collection: 'ranking' });

RankingSchema.plugin(mongoosePaginate);

export interface Ranking extends mongoose.Document {
    id: string;
    name: string,
    description: string,
    players: [string],
    rounds: [string],
    registro: Date
}


mongoose.model("Ranking", RankingSchema);

