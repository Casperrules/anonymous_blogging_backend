import express from 'express';
// import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const databaseURI = process.env.MONGODB_URL || "mongodb+srv://AdarshAdmin:sampleAdmin1@cluster0.5sbgs.mongodb.net/kuch_naya?retryWrites=true&w=majority"; //prefferably set this in .env
mongoose.connect(databaseURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// app.get('/api/products/:id',(req,res)=>{
//     const product = data.products.find(x=> x._id === req.params.id);
//     if(product){
//         res.send(product);
//     }else{
//         res.status(404).send({message: "product not found"});
//     }
// })

// app.get('/api/products',(req,res) => {
//     res.send(data.products);
// });

app.use('/api/users',userRouter);

app.use('/api/products',productRouter)

app.get('/',(req,res)=>{
    res.send("server")
});

app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`serves at http://localhost:${port}`);
});