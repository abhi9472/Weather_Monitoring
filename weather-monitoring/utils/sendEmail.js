
const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async (city, maxTemp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com', 
    subject: `Temperature Alert for ${city}`,
    text: `The maximum temperature in ${city} has exceeded the threshold! Current max temperature: ${maxTemp}°C`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for ${city} with max temperature: ${maxTemp}°C`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
