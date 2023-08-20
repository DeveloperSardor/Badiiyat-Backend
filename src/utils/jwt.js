import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_PASS;

export const JWT = {
    SIGN(payload){
        return jwt.sign({userId : payload}, JWT_SECRET)
    },
    VERIFY(token){
        return jwt.verify(token, JWT_SECRET)
    }
}