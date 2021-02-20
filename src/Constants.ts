import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const mongoConnectionString = process.env.MONGO_CONNECTION