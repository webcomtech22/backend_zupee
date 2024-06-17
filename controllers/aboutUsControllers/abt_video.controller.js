const Video = require("../../app/models/aboutUs/abt_video.model")

const findAll = (req,res)=>{
    
    Video.getAllVideo((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id;
    Video.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    video: row.video,
                    }
                res.json(jsonObject)
            }else{
                res.send({message:"videoData not found"})
            }
        }
    })
}


const abt_updateVideo = async(req,res)=>{
    try{
        id= req.body.id
        let videoData
        videoData={
            video:req.body.video
        }
        // if(req.file){
        //     videoData = {
        //         video: req.file.filename,
        //         }
        // }else
        // {
        //     videoData={
        //         video: req.body.video,
        //     }
        // }
        const editData = await Video.editVideoData(videoData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid video Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

const abt_saveVideo = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let videoData
        
        videoData={
            video: req.body.video
        }
        // if(req.file){
        //      videoData ={
        //         video: req.file.filename,               
        //     }
        // }else{
        //      videoData =  {
        //         video: '',
        //     }
        // }
        const saveData = await Video.saveVideoData(videoData)
        if(saveData){
            res.status(200).json({message:'video data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const abt_deleteVideo = (req,res) =>{
    id = req.params.id
    Video.removeVideo(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "video is deleted"})
        }
    })
}



module.exports = {
    findAll,
    findOne,
    abt_updateVideo,
    abt_saveVideo,
    abt_deleteVideo
}