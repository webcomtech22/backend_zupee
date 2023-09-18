const FooterCustom = require("../../app/models/ZupeeHome/footer.model")

const findOneFooter = (req,res) =>{
    id = req.params.id
    FooterCustom.findById(id ,(err,row)=>{
        if(err){
            console.log(err)
        }else{
                if(row){
                const jsonObject = {
                    id: row.id,
                    logoImage: row.logoImage,
                    facebook: row.facebook,
                    instagram: row.instagram,
                    youtube: row.youtube,
                    messanger: row.messanger,
                    lastText: row.lastText
                }
                res.json(jsonObject)
            }else{
                res.send({message:"footerCustom Data not found"})
            }
        }
    })
}

const updateFooterCustom = async(req,res)=>{
    try{
        id= req.body.id,
        logoImage= req.body.logoImage,
        facebook= req.body.facebook,
        instagram= req.body.instagram,
        youtube= req.body.youtube,
        messanger= req.body.messanger
        lastText= req.body.lastText

        let footerData;

        if(req.files){
            if(req.files['logoImage'] && req.files['logoImage'].length>0){
                logoImage = req.files['logoImage'][0].filename
            }
            if(req.files['facebook'] && req.files['facebook'].length>0){
                facebook = req.files['facebook'][0].filename
            }
            if(req.files['instagram'] && req.files['instagram'].length>0){
                instagram = req.files['instagram'][0].filename
            }
            if(req.files['youtube'] && req.files['youtube'].length>0){
                youtube = req.files['youtube'][0].filename
            }
            if(req.files['messanger'] && req.files['messanger'].length>0){
                messanger = req.files['messanger'][0].filename
            }

            footerData = {
                id: req.body.id,
                logoImage: logoImage,
                facebook: facebook,
                instagram: instagram,
                youtube: youtube,
                messanger: messanger,
                lastText: req.body.lastText
            }
        }else{
            footerData = {
                id: req.body.id,
                logoImage: logoImage,
                facebook: facebook,
                instagram: instagram,
                youtube: youtube,
                messanger: messanger,
                lastText: req.body.lastText
            }

        }

       const editData = await FooterCustom.editFooterCustomData(footerData,id)
       if(editData){
            res.status(200).json({'status':'success','message':"successfully updated"})
       }else{
            res.status(400).json({'status':'success','message':"invalid ourgames request"})
       }
    }catch(err){
        res.status(500).send("error getting update")
    }
}


module.exports = {
    findOneFooter,
    updateFooterCustom
}