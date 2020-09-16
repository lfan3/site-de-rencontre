require('dotenv').config()
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
var nodemailer = require('nodemailer')

const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // These environment variables will be pulled from the .env file
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWD
    },
    debug: true
}
const transporter = nodemailer.createTransport(credentials)

module.exports = {
    
  EmailConfirmTemplate: (to, tocken) => ({
    to : to,
    subject: 'React Confirm Email',
    html: `
      <a href='${CLIENT_ORIGIN}/confirm/${to}/${tocken}'>
        click to confirm email
      </a>
    `,      
    text: `if the link above does not work. Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${tocken}`
  }),
  
  SendMail:(user_email, mail_content) =>{
 
    let mailOptions = {
        from : user_email
    }
    mailOptions = Object.assign(mailOptions, mail_content)
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log('email sended' + info.response);
        }
    })
    }
}


