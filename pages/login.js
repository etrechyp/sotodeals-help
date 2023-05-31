import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const LoginPage = () => {

    const router = useRouter()

    const [credentials , setCredentials] = useState({
        email: '',
        password: ''
    })
    
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp =await axios.post('/api/auth/login', credentials)
        
        if(resp.status === 200) {
            router.push('/dashboard')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' onChange={handleChange} type='email' placeholder='email'></input>
                <input name='password' onChange={handleChange} type='password' placeholder='password'></input>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
