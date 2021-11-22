import express  from "express"
//import getNumber from './core/getNumber.js'

const router = express.Router()

function genNumber() {
    const ran = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    alert(ran)
    return ran
}

const roughScale = () =>{

}

router.post('/start', (_, res, next)=>{
    genNumber() // generate random guessing number
    next()
    res.json({msq: 'The game has started.'})
})

router.get('/', (req, res)=>{
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    // check if NOT a num or not in range [1, 100]
    if(!guessed || guessed < 1 || guessed > 100){
        res.status(406).send({msg:'Not a legal number.'})
    }
    else if(number === guessed){
        res.status(200).send({msg:'Correct.'})
    }
})

router.post('/restart', (_, res)=>{

})

export default router
