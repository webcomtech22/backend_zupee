const Video = require("../../app/models/ZupeeHome/video.model")


const findOneVideo = (req,res) =>{
    id = req.params.id
    Video.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    heading: row.heading,
                    video: row.video,
                }
                res.json(jsonObject)
            }else{
                res.send({message:"video Data not found"})
            }
        }
    })
}

const updateVideo = async(req,res)=>{
    try{
        id = req.body.id
        let videoData;
        if(req.file){
            videoData = {
                id: req.body.id,
                heading: req.body.heading,
                video: req.file.filename
            }
        }else{
            videoData={
                id: req.body.id,
                heading: req.body.heading,
                video: req.body.video
        }
    }
       const editData = await Video.editVideoData(videoData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }

    }catch(err){
        res.status(500).send("error getting update")
    }
}

module.exports ={
    findOneVideo,
    updateVideo
}
