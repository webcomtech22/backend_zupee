const sql = require("../db")

var LudoReviews = function(ludo_reviews){
    this.image = ludo_reviews.image
    this.name = ludo_reviews.name
    this.description = ludo_reviews.description
}

LudoReviews.getAllReviews = (result)=>{
    q = "select * from ludo_reviews"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

LudoReviews.findById = (id,result)=>{
    q= "select * from ludo_reviews where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

LudoReviews.editLudoReviewsData = (ludoReviewsData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_reviews SET ? WHERE id='${id}'`,ludoReviewsData,(err,res)=>{
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

LudoReviews.saveLudoReviewsData = async function(ludoReviewsData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO ludo_reviews SET ?',ludoReviewsData,(err,res)=>{
            if(!err){
                resolve(res);
            }else{
                console.error('Error executing SQL query:', err.sql);
                console.error('Error message:', err.message);
                reject(err);
            }
        });
    })
    return result;

    }catch(err){
        console.log(err)
    }   
}

LudoReviews.removeLudoReviews = (id, result) => {
    q = "delete from ludo_reviews where id = ?"
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




module.exports = LudoReviews;