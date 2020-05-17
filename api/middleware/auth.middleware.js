//=====================  auth.middleware.js  ======================

// middleware to check user-auth in protected routes
module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){ // authorized
        next();
    } else { // not authorized
        res.status(401).json({msg:"you are not authorized to view this resource"})
    }
}



