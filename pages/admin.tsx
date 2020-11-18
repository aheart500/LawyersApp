import Cookie from 'js-cookie'
import {useEffect, useState} from 'react'
import { Lawyer } from '../server/Models'
import { ADD_LAWYER, DELETE_LAWYER, GET_LAWYERS, UPDATE_LAWYER } from '../src/services'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChangeE, FormE } from '../src/types';
import Header from '../src/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 'bold'
    },
    container :{
        width: '90%',
        margin: '1rem auto'
    },
    table: {
        minWidth: 650,
      },
      button:{
          margin: '0 0.5rem'
      },
      newLawyerFrom :{
          display: 'flex',  
          alignItems: 'center',
          '& > span': {
              fontSize: '1.2rem', 
              margin: '0 1rem'
          }
      },
      newTextField: {margin: '0 1rem', width: '20rem'}
  }),
);

const emptyLawyer = {name: '', slug: ''}
const Admin = ()=>{
    const [loading, setLoading] = useState(true)
    const [lawyers, setLawyers] = useState<Lawyer[]>(null)
    const [newLaywer, setNewLaywer] = useState<Partial<Lawyer>>(emptyLawyer)
    const classes = useStyles();
    const handleChange = (e: ChangeE, id: number, field: 'name' | 'slug') =>{
        setLawyers(lawyers.map(lawyer=> {
            return lawyer.id === id? {...lawyer, [field]: e.target.value} : lawyer
        }))
    }
    const handleNewLawyerChange = (e: ChangeE) => setNewLaywer({...newLaywer, [e.target.name]: e.target.value})
    const handleAdd = (e: FormE) =>{
        e.preventDefault()
        ADD_LAWYER(newLaywer).then(res=>{
            setLawyers([res, ...lawyers])
            setNewLaywer(emptyLawyer)
        }).catch(e=> console.log(e))
    }
    const handleUpdate = (row: Lawyer) =>{
        UPDATE_LAWYER(row.id, row).catch(e=> console.log(e))
    }
    const handleDelete = (id: number) =>{
        DELETE_LAWYER(id).then(()=> setLawyers(lawyers.filter(lawyer=> lawyer.id !== id))).catch(e=> console.log(e))
    }
    useEffect(()=>{
        if(Cookie.get('token')){
            GET_LAWYERS().then((res)=>setLawyers(res)).then(()=> setLoading(false))
        }else{
            window.location.replace('/login')
        }
    }, [])

    if(loading) return <h1>جاري التحميل....</h1>
    return (
    <div>
      <Header title='لوحة التحكم' />
      <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>المحامون</Typography>
      <form className={classes.newLawyerFrom} onSubmit={handleAdd}>
          <span>إضافة محامي</span>
          <TextField value={newLaywer.name} className={classes.newTextField} name='name' onChange={handleNewLawyerChange} label='الأسم' variant='filled' />
          <TextField value={newLaywer.slug} className={classes.newTextField}  name='slug' onChange={handleNewLawyerChange} label='اللاحقة' variant='filled' />
          <Button variant='contained' color='primary' type='submit' disabled={newLaywer.name === '' || newLaywer.slug === ''}>إضافة محامي</Button>
      </form>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>الرقم</TableCell>
            <TableCell>الأسم</TableCell>
            <TableCell>لاحقة الرابط</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lawyers.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                  <TextField value={row.name} onChange={(e)=> handleChange(e, row.id, 'name')} />
              </TableCell>
              <TableCell>
              <TextField value={row.slug} onChange={(e)=> handleChange(e, row.id, 'slug')} />
              </TableCell>
              <TableCell>
                  <Button variant='contained' color='primary' className={classes.button} onClick={()=> handleUpdate(row)}>تعديل</Button>
                  <Button variant='contained' color='secondary' onClick={()=> handleDelete(row.id)}>حذف</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
      
    )
}

export default Admin