import { GetServerSideProps } from "next"
import { Client, ClientModel, ImageModel, LawyerModel } from "../../server/Models"
import { removeTimeStamp } from "../../src/utils"
import Header from '../../src/Header'
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { DELETE_CLIENT, DELETE_IMAGE, UPLOAD_IMAGES } from "../../src/services";
import { FormE } from "../../src/types";
import Link from "next/link";
import Head from "next/head";

const useStyles = makeStyles({
    formCintainer:{
        width: '90%',
        margin: '1rem auto'
    },
    button: {
        margin: '1rem'
    },
    uploadForm: {
        width: '90%',
        margin: '1rem auto',
        fontSize: '1.5rem',
      '& input': {
          display: 'none'
        },
      '& > span': {
            fontSize: '1rem',
            margin: '0 1rem'
        },
        '& > label':{
            backgroundColor: '#3a3e3c',
            padding: '0.5rem 0.7rem',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '2px 1px 4px 0px black',
            color: 'white',
        }
        
    },
    buttonsContainer:{
        margin: '1rem'
    },
    imageContainer: {
        border: '1px solid',
        borderRadius : '10px',
        width: '70%', 
        margin: '0.5rem auto',
        textAlign: 'center',
        '& img':{
            maxWidth: '100%'
        }
    }
})
const ClientPage = (props: {client: Client})=>{
    const [images, setImages] = useState<any[]>([])
    const [client, setClient] = useState(props.client)
    const handleUploadImages = async (e: ChangeEvent<HTMLInputElement>)=>{
        setImages(e.target.files as any)
    } 
    const upload = (e: FormE)=>{
        e.preventDefault()
        if(images.length ===0) return
        let formData = new FormData()
        for(const image of images){
            formData.append('images', image)
        }
        formData.append('ClientId', JSON.stringify(client.id))
        UPLOAD_IMAGES(formData).then(res=> setClient({...client, Images: [...res, ...client.Images]})).catch(err=> console.log(err)).finally(()=> setImages([]))
    }
    const deleteImage = (id: number)=>{
        DELETE_IMAGE(id).then(res=> setClient({...client, Images: client.Images.filter(image=> image.id !== id)})).catch(e=> console.log(e))
    }
    const handleDelete = () =>{
        DELETE_CLIENT(client.id).then(res=> window.location.replace(`/${client.Lawyer.slug}/clients`)).catch(err=> console.log(err))
    }
    if(!client) return <h1>لا يوجد موكل بهذا الكود</h1>
    const classes = useStyles()
    return (
    <div>
        <Head>
        <title>المحامي {client.Lawyer.name}</title>
        </Head>
        <Header title={`الأستاذ المحامي / ${client.Lawyer.name}`} />
        <div className={classes.formCintainer}>
            <h1>كود الموكل / {client.code}</h1>
            <h1>الموكل / {client.name}</h1>
            <h1>التاريخ / {client.date}</h1>
            <h1>الحكم / {client.verdict}</h1>
            <h1>الأتعاب / {client.fees} ج</h1>
            <h1>المقدم / {client.forward_payment} ج</h1>
        </div>
        
        <div>
            <form onSubmit={upload} className={classes.uploadForm}>
            <label htmlFor='image'> إضافة صور</label>
            <input type='file' accept='image/*' id='image' name='image' multiple onChange={handleUploadImages}/>
            <span> {images.length> 0? `تم رفع ${images.length} صور` : ''}</span>
            <Button type='submit' variant='contained' color='primary' >حفظ الصور</Button>
            </form>
        </div>
        <div style={{textAlign: 'center'}}>
            <Button variant='contained' size='large' color='secondary' onClick={handleDelete}>حذف القضية</Button>
        </div>
        <div>
            {client.Images.sort((a,b)=> b.id-a.id ).map((image, id)=>{
                const imagePath = `/api/images/${image.path}`
                return (
                    <div className={classes.imageContainer} key={id}>
                        <Link href={imagePath} >
                        <a target='_blank'>
                        <img  src={imagePath} />
                        </a>
                        </Link>
                        <div className={classes.buttonsContainer}>
                            <Button variant='contained' className={classes.button} color='primary'>طباعة الصورة</Button>
                            <Button variant='contained' color='secondary' onClick={()=> deleteImage(image.id)}>حذف الصورة</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div> 
    )
}
export const getServerSideProps : GetServerSideProps = async(query) =>{
    const client =await  ClientModel.findOne({where: {code : query.params.clientCode},include:[{
        model: LawyerModel,
        attributes: ['name', 'slug'],
        where: {slug: query.params.lawyer},
    },{
        model: ImageModel, attributes: ['path','id']
    }]})
    return {props: {client: client? removeTimeStamp(client.toJSON()):  null}}
}
export default ClientPage