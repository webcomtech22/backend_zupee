const BlogRecentPost = require("../../app/models/blog/blog_recentPosts.model")

const findAll = (req,res)=>{
    BlogRecentPost.getAllBlogPosts((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    BlogRecentPost.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    post:rows.post
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"recent post data not found"})
            }
        }

    })
}

const blog_updateRecentPost = async(req,res)=>{
    try{
        id= req.body.id
        let recentPostData;

            recentPostData={
                post: req.body.post
            }
        
        const editData = await BlogRecentPost.editBlogRecentPost(recentPostData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid recent Post Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const blog_saveRecentPost = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let recentPostData
             recentPostData ={
                post: req.body.post
            }
       
        const saveData = await BlogRecentPost.saveBlogRecentPost(recentPostData)
        if(saveData){
            res.status(200).json({message:'recent post data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const blog_deleteRecentPost = (req,res) =>{
    id = req.params.id
    BlogRecentPost.removeBlogRecentPost(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "recentPost is deleted"})
        }
    })
}

module.exports = {
    findAll,
    findOne,
    blog_updateRecentPost,
    blog_saveRecentPost,
    blog_deleteRecentPost
}