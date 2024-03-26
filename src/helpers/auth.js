
const auth = {
    userIsAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            next();
        }else{
            res.status(401).send({message:'User is not logged in', status:401});
        }
    }
}

module.exports = auth;
