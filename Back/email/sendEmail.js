var nodemailer = require('nodemailer')

const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // These environment variables will be pulled from the .env file
      user: 'fifidemacici@gmail.com', 
      pass: 'fl409049'  
    },
    debug: true
}

const transporter = nodemailer.createTransport(credentials)

const sendMail = (user_email, mail_content) =>{
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
module.exports = {
    sendMail : sendMail
}
