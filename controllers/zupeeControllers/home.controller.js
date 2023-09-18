const sql = require('../../app/models/db.js')

function homeController(){
    return{
        showZupeeBanner(req,res){
            q = "select * from zupeebanner where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            bannerImage: row.bannerImage,
                            heading: row.heading,
                            description: row.description
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"banner Data not found"})
                    }
                }

            })
        },
        updateBanner(req,res){
            id= req.body.id
            heading = req.body.heading
            description = req.body.description
            image = req.body.image

            if(req.file){
                image = req.file.filename
                q= "update zupeebanner set heading='"+heading+"', description='"+description+
                "', bannerImage='"+image+"' where id="+id
            }else{
                q= "update zupeebanner set heading='"+heading+"', description='"+description+
                "', bannerImage='"+image+"' where id="+id
            }

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"Data updated"})
            })
        },
        showOurGames(req,res){
            q = "select * from ourgames"
            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        },
        showOneOurGame(req,res){
            q = "select * from ourgames where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            name: row.name,
                            gameImage: row.gameImage
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"ourgames Data not found"})
                    }
                }

            })
        },
        insertOurGames(req,res){
            name = req.body.name
            if(req.file){
                image = req.file.filename
                q= "insert into ourgames values(null,?,?)"
                sql.query(q,[image,name],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"our games Data added"})
                    })
            }else{
            q= "insert into ourgames values(null,?,?)"
                sql.query(q,['',name],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"our games Data added"})
                    })
            }  
        },
        updateOurGames(req,res){
                id= req.body.id
                name = req.body.name
                image = req.body.image
    
                if(req.file){
                    image = req.file.filename
                    q= "update ourgames set name='"+name
                    +"',gameImage='"+image+"' where id="+id
                }else{
                    q= "update ourgames set name='"+name
                    +"',gameImage='"+image+"' where id="+id
                }
    
                sql.query(q,(err,result)=>{
                    if(err) throw err;
                    res.send({message:"Data updated"})
                })
        },
        deleteOurGames(req,res){
            q = "delete from ourgames where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted Our games"});
            })
        },
        showMoneyGames(req,res){
            q = "select * from moneygames"
            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        },
        showOneMoneyImage(req,res){
            q = "select * from moneyGames where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            moneyImage: row.moneyImage
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"moneyGames Data not found"})
                    }
                }

            })
        },
        insertMoneyImage(req,res){
            if(req.file){
                image = req.file.filename
                q= "insert into moneyGames values(null,?)"
                sql.query(q,[image],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"moneygames Data added"})
                    })
            }else{
            q= "insert into moneyGames values(null,?)"
                sql.query(q,[''],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"moneygames Data added"})
                    })
            }
        },
        updateMoneyGames(req,res){
                id= req.body.id
                image = req.body.image
    
                if(req.file){
                    image = req.file.filename
                    q= "update moneyGames set moneyImage='"+image+"' where id="+id
                }else{
                    q= "update moneyGames set moneyImage='"+image+"' where id="+id
                }
    
                sql.query(q,(err,result)=>{
                    if(err) throw err;
                    res.send({message:"Data updated"})
                })
        },
        deleteMoneyGames(req,res){
            q = "delete from moneyGames where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted Our games"});
            })
        },
        showRatingImage(req,res){
            q = "select * from ratingimage"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0];
                        const jsonObject = {
                            id: row.id,
                            heading: row.heading,
                            description: row.description,
                            image: row.image
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"ratingImage Data not found"})
                    }    
                }
            })
        },
        updateRating(req,res){
                id= req.body.id
                heading = req.body.heading
                description = req.body.description
                image = req.body.image
    
                if(req.file){
                    image = req.file.filename
                    q= "update ratingimage set heading='"+heading+"', description='"+description+
                    "', image='"+image+"' where id="+id
                }else{
                    q= "update ratingimage set heading='"+heading+"', description='"+description+
                    "', image='"+image+"' where id="+id
                }
    
                sql.query(q,(err,result)=>{
                    if(err) throw err;
                    res.send({message:"Raring Image Data updated"})
                })
        },
        deleteRatingImage(req,res){
            q = "delete from ratingimage where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted rating Image Data"});
            })
        },
        showReviews(req,res){
            q = "select * from reviews"
            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        },
        showOneReview(req,res){
            q = "select * from reviews where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            image: row.image,
                            name:row.name,
                            description:row.description
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"review not found"})
                    }
                }

            })
        },
        insertReviews(req,res){
            name = req.body.name
            description = req.body.description
            if(req.file){
                image = req.file.filename
                q= "insert into reviews values(null,?,?,?)"
                sql.query(q,[image,name,description],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"reviews Data added"})
                    })
            }else{
            q= "insert into reviews values(null,?,?,?)"
                sql.query(q,['',name,description],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"reviews Data added"})
                    })
            }
            
        },
        updateReviews(req,res){
            id= req.body.id
            name = req.body.name
            description = req.body.description
            image = req.body.image

            if(req.file){
                image = req.file.filename
                q= "update reviews set image='"+image+"', name='"+name+
                "', description='"+description+"' where id="+id;
            }else{
                q= "update reviews set image='"+image+"', name='"+name+
                "', description='"+description+"' where id="+id;
            }

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"Reviews Data updated"})
            })
        },
        deleteReviews(req,res){
            q = "delete from reviews where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted reviews Data"});
            })
        },
        showZupeeMember(req,res){
            q = "select * from zupeemember"
            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        },
        showOneZupeeMember(req,res){
            q = "select * from zupeemember where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            image: row.image
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"zupeemember not found"})
                    }
                }
            }) 
        },
        insertZupeeMember(req,res){
            if(req.file){
                image = req.file.filename
                q= "insert into zupeemember values(null,?)"
                sql.query(q,[image],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"zupeemmber Data added"})
                    })
            }else{
            q= "insert into zupeemember values(null,?)"
                sql.query(q,[''],(err,result,fields)=>{
                    if(err) throw err;
                    res.send({message:"zupeemember Data added"})
                    })
            }
        },
        updateZupeeMember(req,res){
            id= req.body.id
            image = req.body.image

            if(req.file){
                image = req.file.filename
                q= "update zupeemember set image='"+image+"' where id="+id
            }else{
                q= "update zupeemember set image='"+image+"' where id="+id
            }

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"Data updated"})
            })
        },
        deleteZupeeMember(req,res){
            q = "delete from zupeemember where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted reviews Data"});
            })
        },
        showFooterCustom(req,res){
            q = "select * from footerCustom"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0];
                        const jsonObject = {
                            id: row.id,
                            logoImage: row.logoImage,
                            facebook: row.facebook,
                            instagram: row.instagram,
                            youtube: row.youtube,
                            messanger: row.messanger,
                            lastText: row.lastText
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"footerCustom Data not found"})
                    }    
                }
            })
        },
        updateFooterCustom(req,res){
            const id= req.body.id
            let logoImage = req.body.logoImage
            let facebook = req.body.facebook
            let instagram = req.body.instagram
            let youtube = req.body.youtube
            let messanger = req.body.messanger
            let lastText = req.body.lastText

            if(req.files){
                if(req.files['logoImage'] && req.files['logoImage'].length>0){
                    logoImage = req.files['logoImage'][0].filename
                }
                if(req.files['facebook'] && req.files['facebook'].length>0){
                    facebook = req.files['facebook'][0].filename
                }
                if(req.files['instagram'] && req.files['instagram'].length>0){
                    instagram = req.files['instagram'][0].filename
                }
                if(req.files['youtube'] && req.files['youtube'].length>0){
                    youtube = req.files['youtube'][0].filename
                }
                if(req.files['messanger'] && req.files['messanger'].length>0){
                    messanger = req.files['messanger'][0].filename
                }
                console.log(logoImage)
                console.log(facebook)
                console.log(instagram)
                console.log(youtube)
                console.log(messanger)

                q= "update footercustom set logoImage='"+logoImage+"',facebook='"+facebook+"',instagram='"+instagram
                +"', youtube='"+youtube+"', messanger='"+messanger+"',lastText='"+lastText+"' where id="+id
            }else{
                q= "update footercustom set logoImage='"+logoImage+"',facebook='"+facebook+"',instagram='"+instagram
                +"', youtube='"+youtube+"', messanger='"+messanger+"',lastText='"+lastText+"' where id="+id
            }

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"Data updated"})
            })
        },
        showQueAns(req,res){
            q = "select * from que_ans"
            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        },
        showOneQueAns(req,res){
            q = "select * from que_ans where id = ?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0]
                        const jsonObject = {
                            id: row.id,
                            question: row.question,
                            answer: row.answer
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"que-ans not found"})
                    }
                }
            })
        },
        insertQueAns(req,res){
            question = req.body.question
            answer = req.body.answer
            q= "insert into que_ans values(null,?,?)"
            sql.query(q,[question,answer],(err,result,fields)=>{
                if(err) throw err;
                res.send({message:"queAns Data added"})
            })
        },
        updateQueAns(req,res){
            id= req.body.id
            question = req.body.question
            answer = req.body.answer
            console.log(question)
            q= "update que_ans set question='"+question+"',answer='"+answer+"' where id="+id

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"Data queAns updated"})
            })
        },
        deleteQueAns(req,res){
            q = "delete from que_ans where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err) throw err;
                res.send({message:"deleted queAns Data"});
            })
        },
        showVideo(req,res){
            q = "select * from video where id=?"
            sql.query(q,[req.params.id],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        const row = result[0];
                        const jsonObject = {
                            id: row.id,
                            heading: row.heading,
                            video: row.video
                        }
                        res.send(jsonObject)
                    }else{
                        res.send({message:"footerCustom Data not found"})
                    }    
                }
            })
        },
        updateVideo(req,res){
            id= req.body.id
            heading = req.body.heading
            video = req.body.video

            if(req.file){
                video = req.file.filename
                q= "update video set heading='"+heading+"',video='"+video+"' where id="+id
            }else{
                q= "update video set heading='"+heading+"',video='"+video+"' where id="+id
            }

            sql.query(q,(err,result)=>{
                if(err) throw err;
                res.send({message:"video Data updated"})
            })
        }
    }

}

module.exports = homeController;