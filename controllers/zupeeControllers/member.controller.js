const ZupeeMember = require("../../app/models/ZupeeHome/member.model");

const saveMember = async(req,res)=>{
    try{
        let memberData;
        if(req.file){
             memberData ={
                image: req.file.filename
            }
        }else{
             memberData =  {
                image:''
            }
        }
        const saveData = await ZupeeMember.saveMemberData(memberData)
        if(saveData){
            res.status(200).json({message:'ourgames data added'})
        }else{
            res.status(400).json({message:'something went wrong'})

        }
    }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error getting data: ' + err.message);
      }
}

const getMemberList = (req,res)=>{
    ZupeeMember.getAllMemberData((err,result)=>{
        if(err) res.send(err)
        res.send(result)
    })
}

const findOneMember = (req,res) =>{
    id = req.params.id
    ZupeeMember.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    image: row.image,
                }
                res.json(jsonObject)
            }else{
                res.send({message:"zupeemember Data not found"})
            }
        }
    })
}

const updateMember = async(req,res)=>{
    try{
        id = req.body.id
        let memberData;
        if(req.file){
            memberData = {
                id: req.body.id,
                image: req.file.filename,
            }
        }else{
            memberData={
                id: req.body.id,
                image: req.body.image,
            }
        }
       const editData = await ZupeeMember.editMemberData(memberData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}


const deleteMember = (req,res) =>{
    id = req.params.id
    ZupeeMember.removeMember(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message: "zupeemember is deleted"})
        }
    })
}

module.exports = { 
    saveMember,
    getMemberList,
    findOneMember,
    updateMember,
    deleteMember
}