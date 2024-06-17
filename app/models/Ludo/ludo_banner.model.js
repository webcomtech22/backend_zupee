const sql = require("../db")

var Banner = function(ludo_banner){
    this.bigImage = ludo_banner.bigImage
    this.heading = ludo_banner.heading
    this.description = ludo_banner.description
    this.smallImage = ludo_banner.smallImage
}

Banner.findById = (id,result)=>{
    q= "select * from ludo_banner where id =?"
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
Banner.editLudoBannerData = (bannerData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_banner SET ? WHERE id='${id}'`,bannerData, (err,res) => {
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