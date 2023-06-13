import { connectDB } from '../../../utils/mongodb';
import Article from '../../../models/article';

connectDB();

const handleRequest = async (method, req, res) => {
  const { pageNumber, pageSize, section } = req.query;

  try {
    let filter = { active: true };

    if (section) {
      filter.section = section;
    }

    switch (method) {
      case 'GET':
        const articles = await Article.find(filter)
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .sort({ createdAt: -1 });

        res.status(200).json(articles);
        break;

      case 'POST':
        const article = await Article.create(req.body);
        res.status(201).json(article);
        break;

      default:
        res.status(400).json({ message: 'No method provided' });
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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
