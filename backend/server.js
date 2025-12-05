import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import villageRoutes from './routes/village.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

const app = express()
const port = 3000

dotenv.config()

app.use(express.json())

connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/villages",villageRoutes)
app.use("/api/analytics",analyticsRoutes)

app.get('/',(req,res)=>{
    res.send('app is running')
})

app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})