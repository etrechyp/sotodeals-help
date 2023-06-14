import Article from './../../models/article';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { q } = req.query;

    try {
        const articles = await Article.find({ name: { $regex: q, $options: 'i' } });
        res.status(200).json(articles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
  } else {
    res.status(405).json({ error: 'Method ' });
  }
}
