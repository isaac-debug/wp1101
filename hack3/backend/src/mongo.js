import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  dataInit()
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=>console.log('Connected to Mongoose'))
}

export default { connect };