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

const blogInfoController = require("../controllers/blogControllers/blog_blogInfo.contoller")
const blogAboutController = require("../controllers/blogControllers/blog_about.controller")
const blogRecentPostsController = require("../controllers/blogControllers/blog_recentPosts.controller")

const newsBannerController = require("../controllers/newsRoom/news_banner.conroller")
const newsInfoController = require("../controllers/newsRoom/news_newsInfo.controller")

const ludoBannerController = require("../controllers/LudoControllers/ludo_banner.controller")
const ludoGamesController = require("../controllers/LudoControllers/ludo_games.controller")
const ludoRatingController = require("../controllers/LudoControllers/ludo_rating.controller")
const ludoGameToPlayController = require("../controllers/LudoControllers/ludo_gameToPlay.controller")
const ludoReviewsController = require("../controllers/LudoControllers/ludo_reviews.controller")
const ludoStepsController = require("../controllers/LudoControllers/ludo_steps.controller")
const ludoQueAnsController = require("../controllers/LudoControllers/ludo_queans.controller")

const contactUsController = require("../controllers/contact_Us/contact_us.controller")



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
    app.post("/addAbtVideo",upload.none(),abtVideoController.abt_saveVideo)
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



    //blog Apis

    //blog_info
    app.get("/showBlogAllInfo",blogInfoController.findAll)
    app.get("/showBlogSingleInfo/:id",blogInfoController.findOne)
    app.post("/editBlogInfo",upload.single('image'),blogInfoController.blog_updateBlogInfo)
    app.post("/addBlogInfo",upload.single('image'),blogInfoController.blog_saveBlogInfo)
    app.delete("/deleteBlogInfo/:id",blogInfoController.blog_deleteBlogInfo)

    //blog_about
    app.get("/showBlogAbout/:id",blogAboutController.findOne)
    app.post("/editBlogAbout",upload.none(),blogAboutController.blog_updateBlogAbout)

    //blog_recentPost
    app.get("/showBlogAllPosts",blogRecentPostsController.findAll)
    app.get("/showBlogRecentPost/:id",blogRecentPostsController.findOne)
    app.delete("/deleteRecentPost/:id",blogRecentPostsController.blog_deleteRecentPost)
    app.post("/editBlogRecentPost",upload.none(),blogRecentPostsController.blog_updateRecentPost)
    app.post("/addBlogRecentPost",upload.none(),blogRecentPostsController.blog_saveRecentPost)



    //newsroom apis

    //newsroom banner
    app.get("/showNewsBanner/:id",newsBannerController.findOne)
    app.post("/editNewsBanner",upload.single('image'),newsBannerController.news_updateBanner)

    //newsroom info
    app.get("/showNewsSingleInfo/:id",newsInfoController.findOne)
    app.post("/editNewsInfo",upload.single('image'),newsInfoController.news_updateNewsInfo)
    app.post("/addNewsInfo",upload.single('image'),newsInfoController.news_saveNewsInfo)
    app.get("/showNewsAllInfo",newsInfoController.findAll)
    app.delete("/deleteNewsInfo/:id",newsInfoController.news_deleteNewsInfo)


    //LUDO apis

    //ludo banner
    app.get("/showLudoBanner/:id",ludoBannerController.findOne)
    const cpFields4 = upload.fields([{name:'bigImage',maxCount:1},{name:'smallImage',maxCount:1}])
    app.post("/editLudoBanner",cpFields4,ludoBannerController.ludo_updateBanner)

    //ludo games
    app.get("/showLudoAllGames",ludoGamesController.findAll)
    app.get("/showLudoGames/:id",ludoGamesController.findOne)
    app.delete("/deleteLudoGames/:id",ludoGamesController.ludo_deleteLudoGames)
    app.post("/editLudoGames",upload.single('image'),ludoGamesController.ludo_updateLudoGames)
    app.post("/addLudoGames",upload.single('image'),ludoGamesController.ludo_saveLudoGames)

    //ludo rating
    app.get("/showLudoRating/:id",ludoRatingController.findOne)
    app.post("/editLudoRating",upload.single('image'),ludoRatingController.ludo_updateRating)

    //game to play
    app.get("/showLudoGameToPlay/:id",ludoGameToPlayController.findOne)
    app.post("/editLudoGameToPlay",upload.single('image'),ludoGameToPlayController.ludo_updateGameToPlay)

    //ludo reviews
    app.get("/showLudoAllReviews",ludoReviewsController.findAll)
    app.get("/showLudoReviews/:id",ludoReviewsController.findOne)
    app.delete("/deleteLudoReviews/:id",ludoReviewsController.ludo_deleteReviews)
    app.post("/editLudoReviews",upload.single('image'),ludoReviewsController.ludo_updateReviews)
    app.post("/addLudoReviews",upload.single('image'),ludoReviewsController.ludo_saveReviews)

    //luod steps
    app.get("/showLudoAllSteps",ludoStepsController.findAll)
    app.get("/showLudoSteps/:id",ludoStepsController.findOne)
    app.delete("/deleteLudoSteps/:id",ludoStepsController.ludo_deleteSteps)
    app.post("/editLudoSteps",upload.single('image'),ludoStepsController.ludo_updateSteps)
    app.post("/addLudoSteps",upload.single('image'),ludoStepsController.ludo_saveSteps)

    //ludo queAns
    app.get("/showLudoAllQueAns",ludoQueAnsController.findAll)
    app.get("/showLudoQueAns/:id",ludoQueAnsController.findOne)
    app.delete("/deleteLudoQueAns/:id",ludoQueAnsController.ludo_deleteQueAns)
    app.post("/editLudoQueAns",upload.none(),ludoQueAnsController.ludo_updateQueAns)
    app.post("/addLudoQueAns",upload.none(),ludoQueAnsController.ludo_saveQueAns)

    //contactUs
    app.get("/showAllContacts",contactUsController.findAll)
    app.post("/addContact",upload.none(),contactUsController.saveContacts)
    app.delete("/deleteContact/:id",contactUsController.deleteContact)


}

module.exports = initRoutes;