import { GetServerSideProps } from "next"
import { Client, ClientModel, Lawyer, LawyerModel } from "../../server/Models"
import { removeTimeStamp } from "../../src/utils"
import Head from 'next/head'
import Header from "../../src/Header"
import { useState } from "react"
import { makeStyles } from "@material-ui/core"
import Link from "next/link"
const useStyles = makeStyles(()=>({
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '90%',
        margin : '1rem auto'
    },
    card: {
        border: '1px solid black',
        borderRadius: '10px',
        padding: '1rem',
        flexBasis: '25%',
        margin: '1rem'
    }
}))
const ClientCard = ({client, lawyerSlug}: {client: Client, lawyerSlug: string}) => {
    const classes = useStyles()
    return (
        <Link href={`/${lawyerSlug}/${client.code}`}>
        <a className={classes.card}>
            <h2>{client.code}</h2>
            <h1>{client.name}</h1>
            <p>{client.date}</p>
            <h3>{client.fees} ج</h3>
        </a>
        </Link>
    )
}

const LawyerClients = ({lawyer}: {lawyer: Lawyer})=>{
    const [search, setSearch] = useState('')
    const classes = useStyles()
   if(!lawyer) return <h1>لا يوجد محامي بهذا الأسم</h1>
   const renderedClients = lawyer.Clients.filter(client=>{
       const reg = new RegExp(search, 'gi')
       return reg.test(''+ client.code) || reg.test(client.date) || reg.test(client.name)
   }).map((client, i)=> <ClientCard key={i} lawyerSlug={lawyer.slug} client={client} />)
   return (
       <div>
        <Head>
        <title>المحامي {lawyer.name}</title>
        </Head>
        <Header search={search} searching={true} setSearch={setSearch} title={lawyer.name} />
        <div className={classes.cardsContainer}>
        {renderedClients}
        </div>
       </div>
   )
}
export const getServerSideProps: GetServerSideProps = async(query) =>{
    const lawyer  = await LawyerModel.findOne({where: {slug: query.params.lawyer}, include: {
        model: ClientModel,
        attributes: ['name', 'fees', 'code', 'date'],
        order: [['id', 'DESC']]
    }}) 
    return {
        props: {
            lawyer: lawyer?  removeTimeStamp(lawyer.toJSON()) : null
        }
    }
}
export default LawyerClients