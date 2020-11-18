import { Button, TextField } from "@material-ui/core"
import {useState, useEffect} from 'react'
import { LOGIN } from "../src/services"
import useInput from "../src/useInput"
import Cookies from 'js-cookie'
import styles from '../styles/login.module.css'
import { FormE } from "../src/types"
const Login = ()=>{
    const [username, password] = [useInput(), useInput()]
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(Cookies.get('token')) window.location.replace('admin')
    },[])
    const handleLogin = async (e: FormE)=>{
        setError(false)
        setLoading(true)
        e.preventDefault()
        try{
            const token = await LOGIN(username.value, password.value)
            Cookies.set('token', token)
            window.location.replace('/admin')
        }catch(e){
            setError(true)
            console.log(e)
        }finally{
            setLoading(false)
        }
    }
    const sharedProps = {
        error:error,
         helperText:error && 'تحقق من المدخل المطلوب', 
         FormHelperTextProps: {style: {color: 'red'}}
    }
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>لوحة التحكم</h1>
                <div className={styles.textFields}>
                    <TextField {...username} {...sharedProps} label='اسم المستخدم'/>
                    <TextField {...password} {...sharedProps} type='password' label='كلمة المرور' />
                </div>
                    <Button type='submit' variant='contained' disabled={loading}> تسحيل الدخول</Button>
            </form>
        </div>
    )
}
export default Login