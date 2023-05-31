import { verify } from 'jsonwebtoken';

export default function profileHandler(req, res) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const user = verify(token, process.env.SECRET);

    return res.status(200).json({name: user.name, email: user.email});
}