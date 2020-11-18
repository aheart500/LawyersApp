import { GetServerSideProps } from "next"
import { Client, Lawyer, LawyerModel } from "../../server/Models"
import Header from "../../src/Header"
import { removeTimeStamp } from "../../src/utils"
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField'
import { useState } from "react";
import { ChangeE, FormE } from "../../src/types";
import { Button } from "@material-ui/core";
import { ADD_CLIENT } from "../../src/services";
const useStyles = makeStyles({
    formCintainer:{
        width: '90%',
        margin: '1rem auto  '
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        margin: '0.5rem 0'
    },
    dateField: {width: '10rem'},
    verdictField:{
        height: '10rem',
        margin: '0.5rem 0',
        resize: 'none',
        padding: '0.5rem',
        fontFamily: 'Roboto',
        fontSize: '1rem'
    }
})

function getDate(){
    let local = new Date();
    return local.toJSON().slice(0,10);
}
const emtpyClient: Partial<Client> ={
    name: '',
    verdict: '',
    date: getDate(),
    fees: 0,
    forward_payment: 0,
}
const AddClient = ({lawyer}: {lawyer: Lawyer})=>{
    const classes = useStyles()
    const [newClient, setNewClient] = useState<Partial<Client>>(emtpyClient)
    const handleChange = (e: ChangeE) => setNewClient({...newClient, [e.target.name]: e.target.value})
    const handleSubmit = (e:FormE) =>{
        e.preventDefault()
       ADD_CLIENT(lawyer.id, {...newClient, fees: parseFloat(''+ newClient.fees), forward_payment: parseFloat('' + newClient.forward_payment)})
       .then(res=> window.location.replace(`/${lawyer.slug}/${res.code}`)).catch(err=> console.log(err))
    }
    if(!lawyer) return <h1>لا يوجد محامي بهذا الأسم</h1>
   return (
       <div>
           <Header title={`الأستاذ المحامي / ${lawyer.name}`} />
       <div className={classes.formCintainer}>
           <h1>إضافة موكل جديد</h1>
           <form className={classes.form} onSubmit={handleSubmit}>
            <TextField className={classes.textField} name='name' value={newClient.name} onChange={handleChange} label='اسم الموكل' variant='outlined' />
            <TextField className={classes.dateField} name='date' type='date' value={newClient.date} onChange={handleChange}  variant='outlined' />
            <textarea className={classes.verdictField} name='verdict' value={newClient.verdict} onChange={handleChange} placeholder='الحكم' />
            <TextField className={classes.textField} name='fees' type='number' value={newClient.fees} onChange={handleChange} label='الأتعاب' variant='outlined' />
            <TextField className={classes.textField} name='forward_payment' type='number' value={newClient.forward_payment} onChange={handleChange} label='المقدم' variant='outlined' />
            <Button type='submit' size='large' color='secondary' variant='outlined'>إضافة الموكل</Button>
           </form>
       </div>
       </div>
   )
}
export const getServerSideProps: GetServerSideProps = async(query) =>{
    const lawyer  = await LawyerModel.findOne({where: {slug: query.params.lawyer}}) 
    return {
        props: {
            lawyer:lawyer?  removeTimeStamp(lawyer.toJSON()) : null
        }
    }
}
export default AddClient