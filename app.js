// .envfile
require('dotenv').config();

// async errors


// installing express

const express=require('express');
const app=express();


 const notFoundMiddleware=require('./middleware/not-found')
 const errorMiddleware=require('./middleware/error-handler') 
 app.use(express.json())

 // products route
    const products=require('./routes/products');
    app.use('/api/v1/products',products)



//connect database

const connectDB=require('./db/connect');

app.get('/',(req,res)=>{
    res.send('<h1>Store API </h1> <a href="/api/v1/products"> Products API </a>')
})
app.use(errorMiddleware);
app.use(notFoundMiddleware);
const port=process.env.PORT||3500;

const start= async ()=>{
    try {
        await connectDB(process.env.mongourl);
        app.listen(port,
            console.log('server is listening on '+port)
        )
    } catch (error) {
        console.log(error);
    }
}
start();

