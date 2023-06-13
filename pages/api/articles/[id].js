import { connectDB } from '../../../utils/mongodb';
import Article from '../../../models/article';

connectDB();

const handleRequest = async (method, req, res) => {
    
    switch (method) {
        case 'GET':
            try {
              const articles = await Article.find({ active: true, _id: req.query.id });
      
              res.status(200).json(articles);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
            break;

            case 'PUT':
                try {
                    const article = await Article.findByIdAndUpdate(req.query.id, req.body, { new: true });
                    res.status(200).json(article);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
                break;
        
                case 'DELETE':
                try {
                    const article = await Article.findByIdAndUpdate(req.query.id, { active: false });
                    res.status(200).json(article);
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
