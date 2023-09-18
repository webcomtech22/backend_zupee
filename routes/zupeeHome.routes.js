const path = require('path')
const connection = require('../app/models/db.js');
const homeController = require("../controllers/zupeeControllers/home.controller.js");
const multer = require("multer");
const crypto = require('crypto');


function initRoutes(app){
    
    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, 'uploads/');
        },
        filename: (req,file,cb) =>{
            // const timeStamp = Date.now().toString();
            // const timestamp = Date.now().toString() + path.extname(file.originalname).toLowerCase()
            // cb(null, timestamp);
            const timestamp = Date.now().toString();
            const randomString = crypto.randomBytes(8).toString('hex'); // Generates an 8-byte random hex string
            const uniqueFilename = `${timestamp}_${randomString}${path.extname(file.originalname).toLowerCase()}`;
            cb(null, uniqueFilename);
        }
    });

    const upload = multer({storage: storage});

    //zupeebanner
    // app.get("/showZupeeBanner/:id",homeController().showZupeeBanner)
    // app.post("/editZupeeBanner",upload.single('image'),homeController().updateBanner)
    
    //our Games updateOurGames
    // app.get("/showOurGames",homeController().showOurGames)
    // app.get("/showOneOurGame/:id",homeController().showOneOurGame)
    // app.post("/addOurGames",upload.single('image'),homeController().insertOurGames)
    // app.post("/editOurGames",upload.single('image'),homeController().updateOurGames)
    // app.delete("/deleteOurGames/:id",homeController().deleteOurGames)

    //Money Games
    // app.get("/showMoneyGames",homeController().showMoneyGames)
    // app.get("/showOneMoneyImage/:id",homeController().showOneMoneyImage)
    // app.post("/addMoneyImage",upload.single('image'),homeController().insertMoneyImage)
    // app.post("/editMoneyGames",upload.single('image'),homeController().updateMoneyGames)
    // app.delete("/deleteMoneyGames/:id",homeController().deleteMoneyGames)

    //RatingImage 
    // app.get("/showRatingImage/:id",homeController().showRatingImage)
    // app.post("/editRatingImage",upload.single('image'),homeController().updateRating)
    // app.delete("/deleteRatingImage/:id",homeController().deleteRatingImage)

    //reviews 
    // app.get("/showReviews",homeController().showReviews)
    // app.get("/showOneReview/:id",homeController().showOneReview)
    // app.post("/addReviews",upload.single('image'),homeController().insertReviews)
    // app.post("/editReviews",upload.single('image'),homeController().updateReviews)
    // app.delete("/deleteReviews/:id",homeController().deleteReviews)

    //zupeemember
    // app.get("/showZupeeMember",homeController().showZupeeMember)
    // app.get("/showOneZupeeMember/:id",homeController().showOneZupeeMember)
    // app.post("/addZupeeMember",upload.single('image'),homeController().insertZupeeMember)
    // app.post("/editZupeeMember",upload.single('image'),homeController().updateZupeeMember)
    // app.delete("/deleteZupeeMember/:id",homeController().deleteZupeeMember)

    //video
    // app.get("/showVideo/:id",homeController().showVideo)
    // app.post("/editVideo",upload.single('video'),homeController().updateVideo)



    //question-answers 
    // app.get("/showQueAns",homeController().showQueAns)
    // app.get("/showOneQueAns/:id",homeController().showOneQueAns)
    // app.post("/addQueAns",upload.none(),homeController().insertQueAns)
    // app.post("/editQueAns",upload.none(),homeController().updateQueAns)
    // app.delete("/deleteQueAns/:id",homeController().deleteQueAns)


    //footerCustom
    // app.get("/showFooterCustom/:id",homeController().showFooterCustom)

    // const cpFields = upload.fields([{name:'logoImage',maxCount:1},{name:'facebook',maxCount:1},{name:'instagram',maxCount:1},
    // {name:'youtube',maxCount:1},{name:'messanger',maxCount:1}])
    
    // app.post("/editFooterCustom",cpFields,homeController().updateFooterCustom)

}

module.exports = initRoutes;