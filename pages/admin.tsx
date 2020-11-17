import Cookie from 'js-cookie'
import {useEffect, useState} from 'react'
import { Lawyer } from '../server/Models'
import { GET_LAWYERS } from '../src/services'

const Admin = ()=>{
    const [loading, setLoading] = useState(true)
    const [lawyers, setLawyers] = useState<[Lawyer]>(null)
    useEffect(()=>{
        if(Cookie.get('token')){
            GET_LAWYERS().then((res)=>setLawyers(res))
            setLoading(false)
        }else{
            window.location.replace('/login')
        }
    }, [])
    if(loading) return <h1>جاري التحميل....</h1>
    return (
        <div>
            <h1>Hi</h1>
        </div>
    )
}

export default Admin