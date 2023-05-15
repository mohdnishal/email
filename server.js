const express=require('express');
const app=express();
const nodemailer=require('nodemailer');
const PORT=process.env.PORT||5000;
//middleware
app.use(express.static('public'));
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/contact-form.html');
})
app.post('/',(req,res)=>{
    console.log(req.body);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'nishalutd@gmail.com',
            pass:'klskiuoyetrnctwc'
        }
    })
    const mailOption={
        from:req.body.email,
        to:'nishal26433@gmail.com',
        subject:`message from ${req.body.email}`,
        text:req.body.message
    }
    transporter.sendMail(mailOption,(error,info)=>{
        if(error)
        {
            console.log(error);
            res.send('error');
        }else{
            console.log('email sent success');
            res.send("success");
        }
    })
})
app.listen(PORT,()=>{
    console.log(`server running ${PORT}`);
})