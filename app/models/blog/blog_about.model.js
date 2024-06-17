const sql = require("../db")

var BlogAbout = function(blog_about){
    this.description = blog_about.description
}

BlogAbout.findById = (id,result)=>{
    q= "select * from blog_about where id =?"
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
BlogAbout.editBlogAboutData = (blogAboutData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE blog_about SET ? WHERE id='${id}'`,blogAboutData, (err,res) => {
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


module.exports = BlogAbout