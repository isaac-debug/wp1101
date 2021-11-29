import express from 'express';
import {deleteDB, saveScoreCard, queryCard} from './api.js'

const router = express.Router()

router.post('/clear-db', (_, res)=>{
    // clear db
    deleteDB()
    res.json({msg: 'Database cleared'})
})

router.post('/create-card', (req, res) => {
    // create new card
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    try{
        const card = saveScoreCard(name, subject, score)
        res.json({message: `Adding (${name}, ${subject}, ${score})`, card: card});
    }
    catch{
        const card = saveScoreCard(name, subject, score)
        res.json({message: `Updating (${name}, ${subject}, ${score})`, card: card});
    }
})

router.get('/query-cards', async (req, res) => {
    // search 
    const queryType = req.query.queryType
    const queryString = req.query.queryString

    const result =  await queryCard(queryType, queryString)
    if (result == null){
        res.json({msg: false, msg: `${queryType} (${queryString}) not found!`})
    }
    else{
        res.json({msg: result, msg: null})
    }
})


export default router
