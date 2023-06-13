import { connectDB } from '../../../utils/mongodb';
import User from '../../../models/user';
import bcrypt from 'bcryptjs'
const salt = process.env.SALT

connectDB();

const handleRequest = async (method, req, res) => {

    const { pageNumber, pageSize } = req.query;

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({ active: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .sort({ createdAt: -1 });

                res.status(200).json(users);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;

        case 'POST':
            try {
                let { email, name, password } = req.body

                let exist = await User.findOne({ email })
                
                if (exist) {
                    return res.status(301).json({ success: false, message: 'user exist' })
                } else {
                    let hash = bcrypt.hashSync(password, parseInt(salt))
                    let newUser = {
                        email,
                        password: hash,
                        name
                    }
                    const user = await User.create(newUser);
                    res.status(201).json(user);
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;

        default:
            res.status(400).json({ message: 'no method provided' });
            break;
    }
};

export default async (req, res) => {
    const { method } = req;

    try {
        await handleRequest(method, req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
