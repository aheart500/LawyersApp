import { Button, makeStyles } from "@material-ui/core"
import { GetServerSideProps } from "next"
import Head from 'next/head'
import Link from 'next/link'
import {Lawyer as LawyerT, LawyerModel } from "../../server/Models"
import { removeTimeStamp } from "../../src/utils"
const useStyles = makeStyles({
    lawyerName: {
        fontSize: '3rem',
        fontWeight: 'bold'  
    },
    buttonBox: {
        textAlign: 'center'
    },
    button: {margin: '0 1rem'}
})

const Lawyer= ({lawyer}: {lawyer: LawyerT})=>{
   const classes  = useStyles()
   if(!lawyer) return <h1>لا يوجد محامي بهذا الأسم</h1>
   return (
       <div>
        <Head>
        <title>المحامي {lawyer.name}</title>
        </Head>
       <div className='absolute-center'>
            <h1 className={classes.lawyerName}>مكتب الأستاذ المحامي / {lawyer.name}</h1>
            <div className={classes.buttonBox}>
                <Link href={`${lawyer.slug + '/clients'}`}>
                    <Button variant='contained' className={classes.button} color='primary' size='large'> قائمة الموكلين </Button> 
                </Link>
                <Link href={`${lawyer.slug + '/add'}`}>
                    <Button variant='contained' color='secondary' size='large'>إضافة موكل جديد</Button> 
                </Link>
            </div>
       </div>
       </div>
   )
}
export const getServerSideProps: GetServerSideProps = async(query) =>{
    const lawyer  = await LawyerModel.findOne({where: {slug: query.params.lawyer}}) 
    return {
        props: {
            lawyer:lawyer? removeTimeStamp(lawyer.toJSON()): null 
        }
    }
}
export default Lawyer