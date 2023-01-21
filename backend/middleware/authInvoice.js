const jwt =  require("jsonwebtoken")
require("dotenv").config()

const authInvoice = (req, res, next) => {
    
    const userId = req.body.userId
    const companyId = req.body.companyId
    if(!req.headers.authorization || !userId || companyId){
        return res.status(401).json({
            message: "Not authorized to access this route"
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

module.exports = authInvoice
