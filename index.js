// // index.js
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

// Replace these values with your actual email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'earvinekinyua@gmail.com',
    pass: 'eobgrnqgysxkdvsh'
  }
});

app.post('/send-email', (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: 'silamonpayafrica@gmail.com',
    to: formData.email,
    subject: `Subject: ${formData.subject}`,
    text: `Message: ${formData.message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
