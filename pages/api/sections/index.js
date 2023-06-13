import { connectDB } from '../../../utils/mongodb'
import Section from '../../../models/section'

connectDB()

const handleRequest = async (method, req, res) => {

    const { pageNumber, pageSize } = req.query;

    switch (method) {
        case 'GET':
            try {
                const sections = await Section.find({ active: true })
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .sort({ createdAt: -1 });

                res.status(200).json(sections);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;

        case 'POST':
            try {
                const section = await Section.create(req.body);
                res.status(201).json(section);
            }
            catch (err) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
