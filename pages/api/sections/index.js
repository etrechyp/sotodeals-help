import { connectDB } from '../../../utils/mongodb'
import Section from '../../../models/section'

connectDB()

const handleRequest = async (method, req, res) => {

    switch (method) {
        case 'GET':
            try {
                const { pageNumber, pageSize, section, name } = req.query;
                let query = { active: true };
                
                if (section) {
                query.section = section;
                }
                
                if (name) {
                query.name = { $regex: name, $options: 'i' };
                }

                const sections = await Section.find(query)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

                res.status(200).json(sections);
            } catch (err) {
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
