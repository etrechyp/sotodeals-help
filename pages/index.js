import Navbar from './layout/navbar'
import Container from './layout/container'
import SearchBar from './layout/searchBar'

const IndexPage = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Container>
        <h1>Index</h1>
      </Container>
    </div>
  )
}

export default IndexPage