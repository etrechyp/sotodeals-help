import { connectDB } from '../../../utils/mongodb'
import User from '../../../models/user'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
const bcrypt = require('bcryptjs')
const secret = process.env.SECRET

connectDB()

export default async function loginHandler(req, res) {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' })
    } else {
        //const user = await User.findOne({ email }).select('+password')
        const user = await User.findOne({ email })
        if (user) {
            let checkPass = await bcrypt.compare(password, user.password)
            if (checkPass) {
                const token = jwt.sign({
                    email: user.email,
                    name: user.name
                }, secret, { expiresIn: '1h' })
                /* const token = JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
                    email: user.email,
                    name: user.name
                }, process.env.SECRET,
                    {
                        algorithm: 'HS384'
                    }) */

                const serializedToken = serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/'
                })

                res.setHeader('Set-Cookie', serializedToken)
                return res.status(200).json({ success: true, message: 'logged in', token })
            } else {
                return res.status(401).json({ success: false, message: "username or password invalid" })
            }
        } else {
            return res.status(404).json({ success: false, message: "user no exist" })
        }
    }
}