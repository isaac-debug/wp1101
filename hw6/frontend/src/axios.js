import axios from 'axios'

var instance = axios.create({
    baseURL: 'http://localhost:4000/api/guess'})

const startGame = async() =>{
    const {data: {msg}} = await instance.post('/start')
    return msg
}

const guess = async(number) => {
    alert("I am sorry...I haven't finished...")
    try{
        const {data:{msg}} = await instance.get('/', {params:{number}})
        return msg
    }
    catch (error){
        console.log('error')
    }
}

const restart = async()=>{
    const {data: {msg}} = await instance.get()
}

export {startGame, guess, restart}