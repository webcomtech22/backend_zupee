const sql = require("../db")
const DreamTeam = require("./abt_dreamTeam.model")

var Banner = function(abt_banner){
    this.image = abt_banner.image
}

Banner.findById = (id,result)=>{
    q= "select * from abt_banner where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null);
            return;
        }
        if(rows.length > 0){
            result(null,rows[0])
            return;
        }
        result({message:"not found"},null)
    })
}

Banner.editBannerData = (bannerData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_banner SET ? WHERE id='${id}'`,bannerData, (err,res) => {
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



module.exports = Banner