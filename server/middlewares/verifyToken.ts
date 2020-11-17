import { RequestHandler } from "express"
import {SECRET} from '../config'
import jwt from 'jsonwebtoken'
export const tokenHandler: RequestHandler = async(req, res, next)=>{
   const token = req.header("token");
   if (!token) return res.status(401).send("Access Denied");
   try {
     const doc = jwt.verify(token, SECRET);
     req.username = doc as string;
     next();
   } catch (error) {
     res.status(401).send(error);
   }
}