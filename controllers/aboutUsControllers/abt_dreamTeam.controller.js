const DreamTeam = require("../../app/models/aboutUs/abt_dreamTeam.model")

const findAll = (req,res)=>{
    
    DreamTeam.getAllDreamTeam((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const findOne = (req,res)=>{
    id = req.params.id;
    DreamTeam.findById(id,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            if(row){
                const jsonObject ={
                    id:row.id,
                    image: row.image,
                    name:row.name,
                    post:row.post,
                    description:row.description
                }
                res.json(jsonObject)
            }else{
                res.send({message:"DreamTeamData not found"})
            }
        }
    })
}


const abt_updateDreamTeam = async(req,res)=>{
    try{
        id= req.body.id
        let dreamTeamData
        if(req.file){
            dreamTeamData = {
                image: req.file.filename,
                name: req.body.name,
                post:req.body.post,
                description:req.body.description
            }
        }else
        {
            dreamTeamData={
                image: req.body.image,
                name: req.body.name,
                post:req.body.post,
                description:req.body.description
            }
        }
        const editData = await DreamTeam.editDreamTeamData(dreamTeamData,id) 
        if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
        }else{
            res.status(400).json({'status':'success','message':"invalid dreamTeam Data"})

        }

    }catch(err){
        res.status(500).send("error getting update")
    }
}


const abt_saveDreamTeam = async(req,res)=>{
    try{
        // name = req.body.filename
        // description = req.body.description
        let dreamTeamData

        if(req.file){
             dreamTeamData ={
                image: req.file.filename,
                name: req.body.name,
                post:req.body.post,
                description: req.body.description
            }
        }else{
             dreamTeamData =  {
                image: '',
                name: req.body.name,
                post: req.body.post,
                description: req.body.description
            }
        }
        const saveData = await DreamTeam.saveDreamTeamData(dreamTeamData)
        if(saveData){
            res.status(200).json({message:'DreamTeam data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const abt_deleteDreamTeam = (req,res) =>{
    id = req.params.id
    DreamTeam.removeDreamTeam(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message: "dreamteam is deleted"})
        }
    })
}

module.exports = {
    findAll,
    abt_updateDreamTeam,
    findOne,abt_saveDreamTeam,
    abt_deleteDreamTeam
}