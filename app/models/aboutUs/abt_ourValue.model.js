const sql = require("../db")

var OurValues = function(abt_ourvalues){
    this.heading = abt_ourvalues.heading
    this.image1 = abt_ourvalues.image1
    this.image2 = abt_ourvalues.image2
    this.image3 = abt_ourvalues.image3
    this.image4 = abt_ourvalues.image4
    this.image5 = abt_ourvalues.image5
    this.image6 = abt_ourvalues.image6
}

OurValues.findById = (id,result)=>{
    q= "select * from abt_ourvalues where id =?"
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

OurValues.editOurValuesData = (ourValuesData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE abt_ourvalues SET ? WHERE id='${id}'`,ourValuesData, (err,res) => {
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        });
        return result
    }catch(err){
        console.log("error while updating",err)
    }
}


module.exports = OurValues