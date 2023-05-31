import { connectDB } from '../../../utils/mongodb'
import User from '../../../models/user'
import JWT from 'jsonwebtoken'
import { serialize } from 'cookie'

connectDB()

export default async function loginHandler(req, res) {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Please provide an email and password' })

    const user = await User.findOne({ email }).select('+password')

    if (email == user.email && password == user.password) {

        const token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24  * 7),
            email: user.email,
            name: user.name
        }, process.env.SECRET, 
        {
            algorithm: 'HS384'
        })

        const serializedToken = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })

        res.setHeader('Set-Cookie', serializedToken)
        return res.status(200).json('logged in') 

    } else {
        return res.status(401).json({ message: 'Invalid credentials' })
    
    }
}