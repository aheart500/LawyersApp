import express from "express";
import next from "next";
import mainRouter from './routes/main'
import { ClientModel, LawyerModel,ImageModel, Models} from './Models'
// Req Extenstion 
declare global {
    namespace Express {
      interface Request {
        Models : Models,
        username: string 
      }
    }
}

// Server Initialization
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();


nextApp
  .prepare()
  .then(() => {
    app.use(express.json())
    app.use('/api/images', express.static('dist/images'))
    app.use('/api',(req, _, next)=>{
        req.Models ={ 
            Client: ClientModel,
            Image: ImageModel,
            Lawyer: LawyerModel,
        }
        next()
    }, mainRouter)

    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(3000, () => {
      console.log("App ready on port 3000");
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });