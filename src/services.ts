import axios from 'axios'
import Cookie from 'js-cookie'
const token  = Cookie.get('token')
const config = {
    headers: {
        token
    }
}
export const GET_LAWYERS = async()=>{
    const response = await axios.get('/api/lawyers', config)
    return response.data
}

export const LOGIN = async(username: string, password: string)=>{
    const response = await axios.post('/api/login', {username, password})
    return response.data
}
