const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    service:'gmail',
    secure:false,
    port:587,
    auth: {
        user: process.env.nodemailer_email,
        pass: process.env.nodemailer_password
    }
})

module.exports = transporter

transporter.verify((err, success)=>{
    if (success) {
        console.log("Email are ready to be send")
    }else{
        console.log(err)
    }
})