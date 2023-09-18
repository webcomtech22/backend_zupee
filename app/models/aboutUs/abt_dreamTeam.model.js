const sql = require("../db")

var DreamTeam = function(abt_dreamteam){
    this.image = abt_dreamteam.image
    this.name = abt_dreamteam.name
    this.post = abt_dreamteam.post
    this.description = abt_dreamteam.description
}

DreamTeam.getAllDreamTeam = (result)=>{
    q= "select * from abt_dreamteam"
    sql.query(q,(err,rows)=>{
        if(err){
            console.log("error in fetching data")
        }
        result(null,rows)
    })
}

DreamTeam.findById = (id,result)=>{
    q= "select * from abt_dreamteam where id =?"
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


DreamTeam.editDreamTeamData = (dreamTeamData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_dreamteam SET ? WHERE id='${id}'`,dreamTeamData, (err,res) => {
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

DreamTeam.saveDreamTeamData = async function(dreamteamData){
    try{    
        let result = await new Promise((resolve,reject)=>{
        sql.query('INSERT INTO abt_dreamteam SET ?',dreamteamData,(err,res)=>{
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

DreamTeam.removeDreamTeam = (id, result) => {
    q = "delete from abt_dreamteam where id = ?"
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

module.exports = DreamTeam;