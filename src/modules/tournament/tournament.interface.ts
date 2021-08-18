import * as mongoose from 'mongoose';
const mongoosePaginate = require("mongoose-paginate");

export const TournamentSchema = new mongoose.Schema({
    name: { type: String,  required: true },
    organizer: { type: String, required: true},
    start_date: { type: Date},
    end_date: { type: Date},
    players: [{alias: { type: String}, id: { type: String }, seed: { type: Number }}],
    tourney: {
          eventID: { type: String },
          name: { type: String },
          seededPlayers: { type: Boolean},
          seedOrder: { type: String},
          format: { type: String},
          thirdPlaceMatch: { type: Boolean},
          maxPlayers:  { type: Number },
          winValue:  { type: Number },
          drawValue:  { type: Number },
          lossValue:  { type: Number },
          startTime:  { type: Date },
          players: [],
          matches: [],
          active: { type: Boolean},
          etc: {},
          numberOfRounds: { type: Number },
          playoffs: { type: String},
          bestOf:  { type: Number },
          cutType: { type: String},
          cutLimit:  { type: Number },
          tiebreakers: [],
          dutch: { type: Boolean},
          currentRound:  { type: Number },
          nextRoundReady: { type: Boolean}
      },
      EventManager:{tournaments:[]},
    jackpot_player: [{ type: String }],
    jackpot_staker: [{ type: String }],
    reward: {p1:  { type: Number}, p2:  { type: Number},p3: { type: Number},p4:  { type: Number}},
    company: { type: String },
    hour:  { type: String },
    rounds: [{ type: String }],
    description: { type: String },
    subscription: { type: Number },
    registro: { type: Date, default: Date.now }
}, { collection: 'tournament' });

TournamentSchema.plugin(mongoosePaginate);

export interface Tournament extends mongoose.Document {
    id: string,
    name: string,
    organizer: string,
    start_date: Date,
    players: [{_id: string, alias: string, id: string, seed: number}],
    tourney: Tourney,
    EventManager:{tournaments:[]},
    jackpot_player: [string],
    jackpot_staker: [string],
    reward:{p1: string, p2: string, p3: string, p4: string},
    company: string,
    hour: string
    rounds: [string],
    description: string,
    subscription: number,
    registro: Date
}

export interface Tourney {
    id: string,
    eventID:string,
    name: string,
    seededPlayers: boolean,
    seedOrder: string,
    format: string,
    thirdPlaceMatch: boolean,
    maxPlayers:  number,
    winValue:  number,
    drawValue: number,
    lossValue: number,
    startTime: Date, 
    players: [],
    matches: [],
    active: boolean,
    etc: {},
    numberOfRounds: number,
    playoffs: string,
    bestOf:  number,
    cutType: string,
    cutLimit:  number,
    tiebreakers: [],
    dutch:boolean,
    currentRound:  number,
    nextRoundReady: boolean
}
mongoose.model("Tournament", TournamentSchema);
