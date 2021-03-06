import {Router} from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import upload,{handleDelete} from '../middlewares/upload'
import { tokenHandler } from '../middlewares/verifyToken'
import { Image } from '../Models'
const route = Router()

route.get('/lawyers',tokenHandler,async (req,res)=>{
    const lawyers = await req.Models.Lawyer.findAll({order: [['id', 'DESC']]})
    res.send(lawyers)
})

route.post('/lawyer',tokenHandler, async(req,res)=>{
    const newLawyer = await req.Models.Lawyer.create(req.body)
    res.send(newLawyer)
})
route.patch('/lawyer',async(req,res)=>{
    const lawyer = await req.Models.Lawyer.update(req.body.lawyer, {where: {id: req.body.LawyerId}})
    res.send(lawyer)
})
route.delete('/lawyer/:id',async(req,res)=>{
   const lawyer = await req.Models.Lawyer.destroy({where:{id: req.params.id}})
   res.send('Deleted')
})
route.delete('/client/:id',async(req,res)=>{
    const client = await req.Models.Client.destroy({where:{id: req.params.id}})
    res.send('Deleted')
 })
route.patch('/client',async(req,res)=>{
    const client = await req.Models.Client.update(req.body.client, {where: {id: req.body.ClientId}})
    res.send(client)
})
route.post('/client', async(req,res)=>{
    const numberOfClients = await req.Models.Client.count({where: {LawyerId: req.body.LawyerId}})
    const newClient =  await req.Models.Client.create({...req.body.clientData, code: numberOfClients + 1,LawyerId: req.body.LawyerId})
    res.send(newClient)
})

route.post('/login', async(req,res)=>{
    const {username,password} = req.body
    if(username==='rollawer' && password === '123456789'){
        res.send(jwt.sign(username, SECRET))
    }else{
        res.status(401).send("Access Denied");
    }
})
route.post('/image', upload.array('images'), async(req,res)=>{
   const images = (req.files as Array<Express.Multer.File>).map(image=> ({ClientId: req.body.ClientId, path: image.filename}))
   const imagesInserted = await req.Models.Image.bulkCreate(images) 
   res.send(imagesInserted)
})
route.delete('/image/:id', async(req,res)=>{
    let image =await req.Models.Image.findOne({where:{id: req.params.id}}) as any
    handleDelete(image.path)
    await image.destroy()
    res.send('Done')
})
route.get('/:slug',async(req,res)=>{
    const lawyer = await req.Models.Lawyer.findOne({where:{slug: req.params.slug}, include:{
        model: req.Models.Client,
        attributes: ['name', 'fees', 'date', 'code']
    }})
    res.send(lawyer)
})

route.get('/:lawyerSlug/:clientCode', async(req,res)=>{
    const {lawyerSlug, clientCode} = req.params
    const client = await req.Models.Client.findOne({
        where :{code: clientCode},
        include:[{
            model: req.Models.Lawyer,
            attributes: ['name'],
            where: {slug: lawyerSlug},
        },{
            model: req.Models.Image
        }]
    })
    res.send(client)
})

export default route