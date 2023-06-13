import { connectDB } from '../../../utils/mongodb';
import Section from '../../../models/section';

connectDB();

const handleRequest = async (method, req, res) => {

    switch (method) {
        case 'GET':
            try {
                const sections = await Section.find({ active: true, _id: req.query.id });

                res.status(200).json(sections);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
            break;

        case 'PUT':
            try {
                const section = await Section.findByIdAndUpdate(req.query.id, req.body, { new: true });
                res.status(200).json(section);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }

            break;

        case 'DELETE':
            try {
                const section = await Section.findByIdAndUpdate(req.query.id, { active: false });
                res.status(200).json(section);
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
}
