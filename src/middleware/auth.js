const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')             // verify token was created by server jwt
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // find user with the correct id

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user  // save to access from database 
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;