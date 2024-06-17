const sql = require("../db")

var Banner = function(news_banner){
    this.image = news_banner.image
}

Banner.findById = (id,result)=>{
    q= "select * from news_banner where id =?"
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

Banner.editNewsBannerData = (bannerData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE news_banner SET ? WHERE id='${id}'`,bannerData, (err,res) => {
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