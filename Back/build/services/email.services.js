"use strict";
require('dotenv').config();
var CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
var nodemailer = require('nodemailer');
var credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // These environment variables will be pulled from the .env file
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWD
    },
    debug: true
};
var transporter = nodemailer.createTransport(credentials);
module.exports = {
    EmailConfirmTemplate: function (to, tocken) { return ({
        to: to,
        subject: 'React Confirm Email',
        html: "\n      <a href='" + CLIENT_ORIGIN + "/confirm/" + to + "/" + tocken + "'>\n        click to confirm email\n      </a>\n    ",
        text: "if the link above does not work. Copy and paste this link: " + CLIENT_ORIGIN + "/confirm/" + tocken
    }); },
    SendMail: function (user_email, mail_content) {
        var mailOptions = {
            from: user_email
        };
        mailOptions = Object.assign(mailOptions, mail_content);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('email sended' + info.response);
            }
        });
    }
};
