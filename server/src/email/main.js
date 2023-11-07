const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'globytehungary@gmail.com',
    pass: 'zaafuvczfxbglxkv',
  },
});

// todo | sendMail megírása

module.exports = { transporter };
