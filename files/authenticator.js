const crypto =require('node:crypto')
const jwt = require('jsonwebtoken')


const secret = ()=>{
    return crypto.randomBytes(32).toString('hex')
}

const secretKey= secret()

const authenticator = (req ,res,next)=>{
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({msg:'Authentication failed no token'})
    }

    try{
        const decoded =jwt.verify(token,secretKey)
        req.user=decoded.user
        next()

    }catch(error){
        res.status(401).json({Msg : "Authentication failed no token"})
        

    }

}