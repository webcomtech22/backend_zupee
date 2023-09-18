const sql = require('../db')

var Reviews = function(reviews){
   this.image = reviews.image
   this.name = reviews.name
   this.description = reviews.description
}

Reviews.saveReviewsData = async function(reviewData){
        try{    
            let result =await new Promise((resolve,reject)=>{
            sql.query('INSERT INTO reviews SET ?',reviewData,(err,res)=>{
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

Reviews.getAllReviewsData = (result)=>{
    sql.query("SELECT * FROM reviews",(err,res)=>{
        if(!err){
            result(null,res);
        }else{
            console.log('Error in Fetching  Data', err);
        }
    })
}

Reviews.findById = (id, result) => {
    q = "select * from reviews where id = ?"
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

Reviews.editReviewsData = (reviewsData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE reviews SET ? WHERE id='${id}'`,reviewsData, (err,res) => {
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

Reviews.removeReview = (id, result) => {
    q = "delete from reviews where id = ?"
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


module.exports = Reviews;
