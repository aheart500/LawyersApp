import 'dotenv/config'

export const Database ={ 
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
}
export const SECRET = process.env.SECRET