const  BlogAbout = require("../../app/models/blog/blog_about.model");

const findOne = (req,res)=>{
    id = req.params.id;
    BlogAbout.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    description: row.description
                }
                res.json(jsonObject)
            }else{
                res.send({message:"blogabout Data not found"})
            }
        }
    })
}

const blog_updateBlogAbout = async(req,res)=>{
    try{
        id= req.body.id
        let aboutData
    
        aboutData={
            description: req.body.description
        }
        const editData = await BlogAbout.editBlogAboutData(aboutData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid blog About Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}


module.exports = {
    findOne,
    blog_updateBlogAbout
}