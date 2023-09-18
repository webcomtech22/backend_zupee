const path = require('path')
const multer = require("multer");
const crypto = require('crypto');
const bannerController = require('../controllers/zupeeControllers/banner.controller')
const ourGamesController = require("../controllers/zupeeControllers/ourGames.controller")
const moneyGamesController = require("../controllers/zupeeControllers/moneyGames.controller")
const ratingController = require("../controllers/zupeeControllers/rating.controller")
const reviewsController = require("../controllers/zupeeControllers/reviews.controller")
const videoController = require("../controllers/zupeeControllers/video.controller")
const queAnsController = require("../controllers/zupeeControllers/queAns.controller")
const memberController = require("../controllers/zupeeControllers/member.controller")
const footerController = require("../controllers/zupeeControllers/footer.controller")

const abtBannerController = require("../controllers/aboutUsControllers/abt_banner.controller")
const abtWhoWeAreController = require("../controllers/aboutUsControllers/abt_whoWeAre.controller")
const abtGameChangeController = require("../controllers/aboutUsControllers/abt_gameChange.controller")
const abtDreamTeamController = require("../controllers/aboutUsControllers/abt_dreamTeam.controller")
const abtVideoController = require("../controllers/aboutUsControllers/abt_video.controller")
const abtInvestJourneyController = require("../controllers/aboutUsControllers/abt_investJourney.controller")
const abtOurValuesController = require("../controllers/aboutUsControllers/abt_ourValue.controller")
const abtInvestorsController = require("../controllers/aboutUsControllers/abt_investors.controller")





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
    app.get("/showZupeeBanner/:id",bannerController.findOne)
    app.post("/editZupeeBanner",upload.single('image'),bannerController.updateBanner)

    //our Games updateOurGames
    app.get("/showOurGames",ourGamesController.getOurGamesList)
    app.get("/showOneOurGame/:id",ourGamesController.findOneOurGames)
    app.post("/addOurGames",upload.single('image'),ourGamesController.saveOurGames)
    app.post("/editOurGames",upload.single('image'),ourGamesController.updateOurGames)
    app.delete("/deleteOurGames/:id",ourGamesController.deleteOurGames)


    //Money Games
    app.get("/showMoneyGames",moneyGamesController.getMoneyGamesList)
    app.post("/addMoneyImage",upload.single('image'),moneyGamesController.saveMoneyGames)
    app.get("/showOneMoneyImage/:id",moneyGamesController.findOneMoneyGame)
    app.post("/editMoneyGames",upload.single('image'),moneyGamesController.updateMoneyGames)
    app.delete("/deleteMoneyGames/:id",moneyGamesController.deleteMoneyGames)


    //RatingImage 
    app.get("/showRatingImage/:id",ratingController.findOneRating)
    app.post("/editRatingImage",upload.single('image'),ratingController.updateRating)
    // app.delete("/deleteRatingImage/:id",ratingController.deleteRating)


    //reviews 
    app.get("/showReviews",reviewsController.getReviewsList)
    app.post("/addReviews",upload.single('image'),reviewsController.saveReviews)
    app.get("/showOneReview/:id",reviewsController.findOneReview)
    app.post("/editReviews",upload.single('image'),reviewsController.updateReviews)
    app.delete("/deleteReviews/:id",reviewsController.deleteReview)


    //zupeemember
    app.get("/showZupeeMember",memberController.getMemberList)
    app.post("/addZupeeMember",upload.single('image'),memberController.saveMember)
    app.get("/showOneZupeeMember/:id",memberController.findOneMember)
    app.post("/editZupeeMember",upload.single('image'),memberController.updateMember)
    app.delete("/deleteZupeeMember/:id",memberController.deleteMember)


    //video
    app.get("/showVideo/:id",videoController.findOneVideo)
    app.post("/editVideo",upload.single('video'),videoController.updateVideo)

    //question-answers 
    app.get("/showQueAns",queAnsController.getQueAnsList)
    app.post("/addQueAns",upload.none(),queAnsController.saveQueAns)
    app.get("/showOneQueAns/:id",queAnsController.findOneQueAns)
    app.post("/editQueAns",upload.none(),queAnsController.updateQueAns)
    app.delete("/deleteQueAns/:id",queAnsController.deleteQueAns)


    //footerCustom
    app.get("/showFooterCustom/:id",footerController.findOneFooter)

    const cpFields = upload.fields([{name:'logoImage',maxCount:1},{name:'facebook',maxCount:1},{name:'instagram',maxCount:1},
    {name:'youtube',maxCount:1},{name:'messanger',maxCount:1}])
    
    app.post("/editFooterCustom",cpFields,footerController.updateFooterCustom)



    //About us APIs

    //abt_banner
    app.get("/showAbtBanner/:id",abtBannerController.findOne)
    app.post("/editAbtBanner",upload.single('image'),abtBannerController.abt_updateBanner)

    //abt_whoweare
    app.get("/showAbtWhoWeAre/:id",abtWhoWeAreController.findOne)
    app.post("/editAbtWhoWeAre",upload.single('image'),abtWhoWeAreController.abt_updateWhoWeAre)

    //abt_gameChange
    app.get("/showAbtGameChange/:id",abtGameChangeController.findOne)
    const cpFields3 = upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},
    {name:'image4',maxCount:1},{name:'image5',maxCount:1}])
    app.post("/editAbtGameChange",cpFields3,abtGameChangeController.abt_updateGameChange)

    //abt_dreamTeam
    app.get("/showAbtAllDreamTeam",abtDreamTeamController.findAll)
    app.get("/showOneAbtDreamTeam/:id",abtDreamTeamController.findOne)
    app.post("/editAbtDreamTeam",upload.single('image'),abtDreamTeamController.abt_updateDreamTeam)
    app.post("/addAbtDreamTeam",upload.single('image'),abtDreamTeamController.abt_saveDreamTeam)
    app.delete("/deleteAbtDreamTeam/:id",abtDreamTeamController.abt_deleteDreamTeam)



    //abt_video
    app.get("/showAbtAllVideo",abtVideoController.findAll)
    app.get("/showOneAbtVideo/:id",abtVideoController.findOne)
    app.post("/editAbtVideo",upload.single('video'),abtVideoController.abt_updateVideo)
    app.post("/addAbtVideo",upload.single('video'),abtVideoController.abt_saveVideo)
    app.delete("/deleteAbtVideo/:id",abtVideoController.abt_deleteVideo)



    //abt_investJourney
    app.get("/showAbtInvestJourney/:id",abtInvestJourneyController.findOne)
    app.post("/editAbtInvestJourney",upload.single('image'),abtInvestJourneyController.abt_updateInvestJourney)

    //abt_ourvalues
    app.get("/showAbtOurValues/:id",abtOurValuesController.findOne)
    const cpFields2 = upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},
    {name:'image4',maxCount:1},{name:'image5',maxCount:1},{name:'image6',maxCount:1}])
    app.post("/editAbtOurValues",cpFields2,abtOurValuesController.abt_updateOurValues)


    //abt_investors
    app.get("/showAbtInvestors/:id",abtInvestorsController.findOne)
    app.post("/editAbtInvestors",upload.single('image'),abtInvestorsController.abt_updateInvestors)

}

module.exports = initRoutes;