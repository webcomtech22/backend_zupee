const sql = require('../db')

var Banner = function(zupeebanner){
    this.bannerImage = zupeebanner.bannerImage
    this.heading = zupeebanner.heading
    this.description = zupeebanner.description
}

Banner.findById = (id, result) => {
    q = "select * from zupeebanner where id = ?"
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

Banner.editBannerData = (bannerData,id)=>{
    try{
        let result = new Promise((resolve,reject)=>{
            sql.query(`UPDATE zupeebanner SET ? WHERE id='${id}'`,bannerData, (err,res) => {
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

module.exports = Banner;












// create table zupeebanner(id int(11) auto_increment, bannerImage varchar(100),
//  heading text, description text, primary key(id))

// create table ourgames(id int auto_increment, bannerImage varchar(100),
// name varchar(100), primary key(id));
//  select * from ourgames;

// alter table ourgames change column bannerImage gameImage varchar(100);

// create table moneyGames(id int auto_increment, moneyImage varchar(100),
// name varchar(100), primary key(id));
//  select * from moneyGames;
//  alter table moneygames drop column name;
 
// create table ratingimage(id int auto_increment,heading varchar(100),
// description text,image varchar(100),primary key(id));
// select * from ratingimage;

// create table reviews(id int auto_increment,image varchar(100),
// name varchar(100),description text,primary key(id));
// select * from reviews;

// create table video(id int auto_increment,video varchar(100),
// heading varchar(255),lastHeading varchar(255),primary key(id));
// select * from reviews;

// create table zupeemember(id int auto_increment,image varchar(100),
// heading varchar(255),primary key(id));
// select * from zupeemember;
// alter table zupeemember drop column heading;

// create table footerCustom(id int auto_increment,image varchar(100),
// facebook varchar(255),instagram varchar(255),youtube varchar(255),
// messanger varchar(255),lastText varchar(100),primary key(id));
// select * from footercustom;
// alter table footercustom change column image logoImage varchar(100);


