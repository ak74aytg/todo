import { app } from './app.js'
import { dbConnection } from './data/user.js';


app.listen(process.env.PORT,()=>{
    console.log('server is running');
})