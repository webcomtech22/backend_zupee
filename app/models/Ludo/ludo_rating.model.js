const sql = require("../db")

var LudoRating = function(ludo_rating){
    this.heading = ludo_rating.heading
    this.description = ludo_rating.description
    this.image = ludo_rating.image
}

LudoRating.findById = (id,result)=>{
    q= "select * from ludo_rating where id =?"
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

LudoRating.editLudoRatingData = (ratingData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_rating SET ? WHERE id='${id}'`,ratingData, (err,res) => {
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


module.exports = LudoRating