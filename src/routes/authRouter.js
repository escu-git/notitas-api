const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res)=>{
    console.log(req)
    console.log(req)

    if(req.user){
        res.status(200).json({
            error:false,
            message:"Login was Successfull",
            user:req.user
        })
    }else{
        res.status(403).json({error:true, message:"User not authorized"});
    }
})

router.get("/login/failed", (req, res)=>{
    console.log('login failuref')
    res.status(401).send({
        error:true,
        message:"Login failed"
    })
})

router.get("/google/callback", passport.authenticate("google",{
    successRedirect:`${process.env.UI_URL}/`,
    failureRedirect:`${process.env.UI_URL}/login/failed`
}), (req, res, next)=>{
    res.redirect('/');
})

router.get("/google", passport.authenticate("google", ["profile","email"]));

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports=router;