const sql = require('../db')

var FooterCustom = function(footercustom){
    this.logoImage = footercustom.logoImage
    this.facebook = footercustom.facebook
    this.instagram = footercustom.instagram
    this.youtube = footercustom.youtube
    this.messanger = footercustom.messanger
    this.lastText = footercustom.lastText
}

FooterCustom.findById = (id, result) => {
    q = "select * from footercustom where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows[0])
            return;
        }
        result({message:"not found"},null)
    })
}

FooterCustom.editFooterCustomData = (footerData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE footercustom SET ? WHERE id='${id}'`,footerData, (err,res) => {
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        });
        return result
    }catch(err){
        console.log("error while updating")
    }
}

module.exports = FooterCustom
