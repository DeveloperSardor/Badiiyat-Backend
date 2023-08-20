import expess from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import '../utils/connection_db.js'
import router from '../routes/index.js'
import ErrorURl from '../utils/errorUrl.js'

const PORT = process.env.PORT || 3000;
dotenv.config()


const app = expess();
app.use(cors('*'))
app.use(expess.json())

app.use('/api', router);


app.get('/users', (req, res)=>{res.send('salom')})


app.use('*', ErrorURl)
app.listen(PORT, console.log(`Server running on port ${PORT}`))