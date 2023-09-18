const sql = require('../db')

var RatingImage = function(ratingimage){
   this.heading = ratingimage.heading
   this.description = ratingimage.description
   this.image = ratingimage.image
}



RatingImage.findById = (id, result) => {
    q = "select * from ratingimage where id = ?"
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

RatingImage.editratingData = (ratingData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ratingimage SET ? WHERE id='${id}'`,ratingData, (err,res) => {
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

RatingImage.removeRating = (id, result) => {
    q = "delete from ratingImage where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows)
            return;
        }
        result({message:"not found"},null)
    })
}


module.exports = RatingImage