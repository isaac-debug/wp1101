import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import Message from './models/message.js';
import {sendData, sendStatus} from './wssConnect.js'

dotenv.config();
if(!process.env.MONGO_URL){
    console.error('Missing Mongo Url!')
    process.exit(1)
}

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true
  })

const db = mongoose.connection
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


db.once('open', () => {
    console.log('MongoDB connected!')
  
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
          const { data } = byteString
          const [task, payload] = JSON.parse(data)
          switch (task) {
            case 'input': {
              const { name, body } = payload
              const message
                = new Message({ name, body })
              try { await message.save();
              } catch (e) { throw new Error
                ("Message DB save error: " + e);
              }
              sendData(['output', [payload]])
              sendStatus({
                type: 'success',
                msg: 'Message sent.'
              }, ws)
              break
            }
            case 'clear': {
              Message.deleteMany({}, () => {
                sendData(['cleared'])
                sendStatus({ type: 'info', msg: 'Message cache cleared.'})
              })
              break
            }        
            default: break
          }
        }

    const PORT = process.env.port || 4000
        
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
    })
  
    
  })
  

