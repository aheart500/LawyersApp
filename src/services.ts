import axios from 'axios'
import Cookie from 'js-cookie'
import { Client, Lawyer } from '../server/Models'
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
export const UPDATE_LAWYER = async(id: number, lawyer: Lawyer) =>{
    const response = await axios.patch('/api/lawyer', {LawyerId: id, lawyer})
    return response.data
}
export const DELETE_LAWYER = async(id: number)=>{
    const response = await axios.delete('/api/lawyer/' + id)
    return response.data
}
export const ADD_LAWYER = async(lawyer: Partial<Lawyer>)=>{
    const response = await axios.post('/api/lawyer', lawyer, config)
    return response.data as Lawyer
}
export const ADD_CLIENT = async(LawyerId: number, clientData: Partial<Client>) =>{
    const response = await axios.post("/api/client", {LawyerId, clientData})
    return response.data as Client
}
export const UPLOAD_IMAGES = async (form: any) =>{
    const response = await axios.post('/api/image', form)
    return response.data
}
export const DELETE_IMAGE = async (id: number) =>{
    const response = await axios.delete('/api/image/'+ id)
    return response.data
}
export const DELETE_CLIENT = async (id: number) =>{
    const response = await axios.delete('/api/client/'+ id)
    return response.data
}