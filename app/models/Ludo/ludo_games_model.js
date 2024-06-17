const sql = require("../db")

var LudoGames = function(ludo_games){
    this.image = ludo_games.image
    this.name = ludo_games.name
}

LudoGames.getAllGames = (result)=>{
    q = "select * from ludo_games"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

LudoGames.findById = (id,result)=>{
    q= "select * from ludo_games where id =?"
    sql.query(q,id,(err,rows)=>{
        if(err){
           result(err,null)
           return;
        }
        result(null,rows[0])
        return;
    })
}

LudoGames.editLudoGamesData = (ludoGamesData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE ludo_games SET ? WHERE id='${id}'`,ludoGamesData,(err,res)=>{
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

LudoGames.saveLudoGamesData = async function(ludoGamesData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO ludo_games SET ?',ludoGamesData,(err,res)=>{
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

LudoGames.removeLudoGames = (id, result) => {
    q = "delete from ludo_games where id = ?"
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



module.exports = LudoGames;