const jwt =  require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    // console.log(req.headers.authorization)
    // const token = req.headers.authorization.split(' ')[0]
    const id = req.body.userId
    if(!req.headers.authorization || !id){
        return res.status(401).json({
            message: "no token provided"
        })
    }
    const token = req.headers.authorization.split(' ')[0]
    decodeJWT =  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
   
    if (decodeJWT.id != id){
        return res.status(401).json({
            message: "Not authorized to access this route"
        })
    }
    try{
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
