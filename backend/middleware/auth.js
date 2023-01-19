const jwt =  require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    // console.log(req.headers.authorization)
    // const token = req.headers.authorization.split(' ')[0]

    if(!req.headers.authorization){
        return res.status(401).json({
            message: "no token provided"
        })
    }
    try{
        const token = req.headers.authorization.split(' ')[0]

        const decode = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch{
        return res.status(401).json({
            message: "Not authorized to access this route"
        })
    }
    next()
}

module.exports = auth
