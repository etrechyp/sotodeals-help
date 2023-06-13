import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Navbar from '../layout/common/navbar'
import { Container } from '@mui/material'

const SectionViewPage = () => {
  const router = useRouter()

  const [section, setSection] = useState({})
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { name } = router.query

    const getSection = async () => {
      const { data } = await axios.get(`/api/sections/${name}`)
      setSection(data[0])
    }

    const getArticles = async () => {
      const { data } = await axios.get(`/api/articles?section=${name}`)
      setArticles(data)
      setLoading(false)
    }

    if (name) {
      getSection()
      getArticles()
    }
  }, [router])


  return (
    <div>
        <Navbar />
        <Container>
            <h1>Sections</h1>
            <h2>{section.name}</h2>
            <h3>Articles</h3>
            <ul>
                {articles.map(article => (
                    <li key={article._id}>
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </Container>
    </div>
  )
}

export default SectionViewPage