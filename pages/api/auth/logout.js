import { verify } from "jsonwebtoken"
import { serialize } from "cookie"

export default function logoutHandler(req, res) {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }


    try {
        verify(token, process.env.SECRET)
        const serializedToken = serialize('token', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })

        res.setHeader('Set-Cookie', serializedToken)
        return res.status(200).json({ message: 'logged out' })
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }



}
