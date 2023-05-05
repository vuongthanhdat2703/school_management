import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/home/dashboard')
    }, [navigate])
    return <></>
}

export default Home