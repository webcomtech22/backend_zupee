const sql = require('../db')

var MoneyGames = function(moneygames){
   this.gameImage = moneygames.moneyImage
}

MoneyGames.saveMoneyGames = async function(moneyData){
        try{    
            let result =await new Promise((resolve,reject)=>{
            sql.query('INSERT INTO moneygames SET ?',moneyData,(err,res)=>{
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

MoneyGames.getAllMoneyGames = (result)=>{
    sql.query("SELECT * FROM moneygames",(err,res)=>{
        if(!err){
            result(null,res);
        }else{
            console.log('Error in Fetching  Data', err);
        }
    })
}


MoneyGames.findById = (id, result) => {
    q = "select * from moneygames where id = ?"
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

MoneyGames.editMoneyGamesData = (gamesData,id) => {
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE moneygames SET ? WHERE id='${id}'`,gamesData, (err,res) => {
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

MoneyGames.removeMoneyGames = (id, result) => {
    q = "delete from moneygames where id = ?"
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


module.exports = MoneyGames;
