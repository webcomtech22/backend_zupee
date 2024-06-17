const BlogInfo = require("../../app/models/blog/blog_blogInfo.model")

const findAll = (req,res)=>{
    BlogInfo.getAllBlogInfo((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id
    BlogInfo.findById(id,(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            if(rows){
                const jsonObject={
                    id:rows.id,
                    image:rows.image,
                    heading:rows.heading,
                    dateName:rows.dateName,
                    description:rows.description
                }
                res.send(jsonObject)
            }else{
                res.send({mesaage:"Blog Info data not found"})
            }
        }

    })
}

const blog_updateBlogInfo = async(req,res)=>{
    try{
        id= req.body.id
        let blogInfoData;
        if(req.file){
            blogInfoData={
                image: req.file.filename,
                heading: req.body.heading,
                dateName: req.body.dateName,
                description: req.body.description,
            }
        }else{
            blogInfoData={
                heading:req.body.heading,
                dateName:req.body.dateName,
                description: req.body.description,
                image: req.body.image
            }           
        }
        const editData = await BlogInfo.editBlogInfoData(blogInfoData,id)
    
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid blogInfo Data"})
        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const blog_saveBlogInfo = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let blogInfoData
        console.log(req.body.heading)
        if(req.file){
             blogInfoData ={
                image: req.file.filename,
                heading: req.body.heading,
                dateName:req.body.dateName,
                description: req.body.description
            }
        }else{
             blogInfoData =  {
                image: '',
                heading: req.body.heading,
                dateName: req.body.dateName,
                description: req.body.description
            }
        }
        const saveData = await BlogInfo.saveBlogInfoData(blogInfoData)
        if(saveData){
            res.status(200).json({message:'bloginfo data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const blog_deleteBlogInfo = (req,res) =>{
    id = req.params.id
    BlogInfo.removeBlogInfo(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "blogInfo is deleted"})
        }
    })
}

module.exports = {
    findAll,
    findOne,
    blog_updateBlogInfo,
    blog_saveBlogInfo,
    blog_deleteBlogInfo
}