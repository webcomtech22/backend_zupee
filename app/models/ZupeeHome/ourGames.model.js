const sql = require('../db')

var Ourgames = function(ourgames){
   this.gameImage = ourgames.gameImage
   this.name = ourgames.name
}

Ourgames.saveOurGames = async function(games){
        try{    
            let result =await new Promise((resolve,reject)=>{
            sql.query('INSERT INTO ourgames SET ?',games,(err,res)=>{
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

Ourgames.getAllOurGames = (result) =>{
    sql.query("SELECT * FROM ourgames",(err,res)=>{
        if(!err){
            result(null,res)
        }else{
            console.log("error in fetching data",err)
        }
    })
}

Ourgames.findById = (id, result) => {
    q = "select * from ourgames where id = ?"
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

Ourgames.editOurGamesData = (ourGamesData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ourgames SET ? WHERE id='${id}'`,ourGamesData, (err,res) => {
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


Ourgames.removeOurGames = (id, result) => {
    q = "delete from ourgames where id = ?"
    sql.query(q,id,(err,rows)=>{
        if(err){
            result(err,null)
            return;
        }
         if(rows.length){
            result(null,rows)
            return;
        }
    })
}


module.exports = Ourgames
