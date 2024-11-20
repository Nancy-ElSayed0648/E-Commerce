process.on('uncaughtException',()=>{
    console.log('error in code');
    
})

import express from 'express'
import { dbconnection } from './database/DBconnection.js'
import { bootstarp } from './src/modules/bootstrap.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import  dotenv  from 'dotenv';
import cors from 'cors'
import { catchError } from './src/middleware/catchError.js';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QMQY9L15ImBJJnP1hlmZZ4bAALAOg5DoruiFnw1XhqgIYi9THCZJFVQZm4do9R3J61ai91rZ1aLydeReNr1wH6x00wAHznVpl');

//hhhhhh
const app = express()
const port = 3000



app.post('/webhook', express.raw({type: 'application/json'}),catchError(async(req,res) => {
    
  const signature = req.headers['stripe-signature'].toString()
  let event  = stripe.webhooks.constructEvent(req.body,signature,'whsec_dvQu8pAKr1TqkZQxEVLgIsA08hFvvOeS');
  let checkout 
    if (event.type=="checkout.session.completed") {
         checkout = event.data.object;
    }
    res.status(200).json({message: "success",checkout})
  }));
  







dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

dbconnection()
bootstarp(app)


app.use('*' , (req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`,404))
})
app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error' , err);
    
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT|| port, () => console.log(`Example app listening on port ${port}!`))