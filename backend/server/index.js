const express = require("express");
const { sendEmail } = require("./email");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get("/start", (req, res) => {
  res.json({ message: "Welcome to the watchstatistics backend!" });
});

app.get("/submitfeedback", async (req, res) => {
  try {
    const teste2 = {
      message: req.body.message,
      userName: "teste",
      userEmail: "teste",
    };
    const submitFeedback = await sendEmail(teste2);
    res.status(200).send(submitFeedback);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const teste = {
  message: "teste",
  userName: "pedro",
  userEmail: "pedrogilse@gmal.com",
};
//sendEmail(teste);
