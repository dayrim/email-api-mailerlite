const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = [
      /^https?:\/\/(.*\.)?connection-tribe\.net$/,
      /^http:\/\/localhost:3000$/,
    ];
    const originIsAllowed = allowedOrigins.some((regex) => regex.test(origin));

    if (originIsAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const emailPandaArt = `
    <pre>
        ʕ•ᴥ•ʔ
       <b>Email Panda</b>
    </pre>
    `;

  res.send(`
      <html>
      <head><title>Email Panda</title></head>
      <body>
        <h1>Welcome to Email Panda Service</h1>
        ${emailPandaArt}
        <p>Use our service to send your emails securely and efficiently!</p>
      </body>
      </html>
    `);
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await axios.post(
      "https://api.mailerlite.com/api/v2/subscribers",
      {
        email: email,
        name: name,
        fields: {
          message: message,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
        },
      }
    );

    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to send email", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
