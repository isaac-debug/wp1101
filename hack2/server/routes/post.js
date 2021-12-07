import express from 'express'
import Post from '../models/post'
//import moment from 'moment'
//import { post } from 'cypress/types/jquery';

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (_, res) => {
    let msg
    const posts = await Post.find({}).sort({timestamp: 'descending'});
    if (posts.length === 0){
        msg = {
            "message": "error",
            "data": null
        }
    }
    else{
        msg ={
            "message": "success",
            "data": [posts]
        }
    }
    res.json(msg);
});


// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    try {
        const thePost = await Post.find({'pid': req.body.pid});
        res.json({
            'message': 'success',
            'post': thePost
        })
    }
    catch(e){
        res.json({
            'message': 'error',
            'post': null
        })
    }
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('api/newPost', async (req, res)=>{
    const postId = req.body.pid
    const title = req.body.title
    const content = req.body.content
    const timestamp = req.body.timestamp
    try{
        const newPost = new Post({ postId, title, content, timestamp})
        newPost.save()
        res.json({'message':'success'})
    }
    catch(e){
        res.json({'message':'error'})
    }
})

// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async(req, res)=>{
    const postId = req.body.pid
    try{
        Post.find({pid:postId}).remove().exec();
        res.json({'message':'success'})
    }
    catch{
        res.json({'message':'error', 'post':null})
    }
})
export default router