import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const CompanySchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  company: { type: String },
  img: { type: String },
  social: [{ type: String }],
  staker: [{ type: String }],
  tornament: [{ type: String }],
  players: [{ type: String }],
  ein: { type: String },
  registro: { type: Date, default: Date.now },
},
{ collection: 'company' });

CompanySchema.plugin(mongoosePaginate);

export interface Company extends mongoose.Document {
    id: string;
    user: string,
    company: string,
    img:string,
    social: [string],
    staker: [string],
    tornament: [string],
    players: [string],
    ein: string,
    registro: Date
}
mongoose.model("Company", CompanySchema);
