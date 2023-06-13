import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Navbar from "./layout/common/navbar"
import SearchBar from "./layout/widgets/searchBar"
import {
    Grid,
    Container
} from "@mui/material"

const SearchPage = () => {
  const { query } = req.query.search

  return (
    <div>
        <Navbar />
        <SearchBar />
        <br/>
        <Container>
            <p>your result here</p>
        </Container>
    </div>
  )
}

export default SearchPage