import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Navbar from "./shared/navbar"

const Dashboardpage = () => {

    const router = useRouter()

    const [profile, setProfile] = useState({
        name: '',
        email: ''
    })

    const getProfile = async () => {
        const resp = await axios.get('/api/profile')
        setProfile(resp.data)
    }

    const logout = async () => {
        try {
            await axios.get('/api/auth/logout')
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>

            <h2>{profile.name}</h2>
            <p>{profile.email}</p>

            <button onClick={() => getProfile()}>getProfile</button>

            <button onClick={() => logout()}>logout</button>

        </div>
    )
}

export default Dashboardpage
