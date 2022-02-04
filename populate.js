require('dotenv').config();
const connectDB=require('./db/connect');
const Products=require('./models/product');

const jsonProducts=require('./products.json');

const start= async()=>{

    try {
            await connectDB(process.env.mongourl)
            console.log('success!!!');
            await Products.deleteMany();
            await Products.create(jsonProducts)
            process.exit(0);
    } catch (error) {
        process.exit(1);
        console.log(error);
    }

}
start();