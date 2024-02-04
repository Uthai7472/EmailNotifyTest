const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001; // or any port you prefer

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render the form page
app.get('/', (req, res) => {
  res.render('form');
});

// Handle form submission
app.post('/send', (req, res) => {
  const message = req.body.message;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uthaikhanthamongkol@gmail.com',
      pass: 'q v z x p j v t f r f l w a k l',
    },
  });

  // Set up the email message
  const mailOptions = {
    from: 'uthaikhanthamongkol@gmail.com',
    to: 'nm.fonn7@gmail.com',
    subject: 'New Message',
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    //   res.render('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.render('success');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});