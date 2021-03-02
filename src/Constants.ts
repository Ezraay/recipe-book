import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT || 80
export const mongoConnectionString = process.env.MONGO_CONNECTION || "mongodb://localhost:27017"
export const mongoDatabaseName = process.env.MONGO_DATABASE_NAME || "recipe-book"