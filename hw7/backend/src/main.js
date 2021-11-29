import express from 'express';  
import cors from 'cors'
import routes from './routes/index.js'
import mongoose  from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config();

const app = express();
app.use(express.json())


// init middleware
app.use(cors())

// define routes
app.use('/api', routes)

// set database
mongoose.connect('mongodb+srv://wp1101:wp1101@cluster0.pctb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=>console.log('Connected to Mongoose'))

//define server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
