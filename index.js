const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS module
dotenv.config();

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://connection-tribe.net"], // Specify your frontend application's URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS with your specified options

app.use(bodyParser.json());

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
          "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY, // Use environment variable for your API key
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
