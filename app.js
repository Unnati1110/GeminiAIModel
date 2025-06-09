const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI('AIzaSyA7n5AQkuX0-47k7dhpr4UYhBbC-JQcH4Y'); 

app.post("/getResponse", async (req, res) => {
  try {
    const question = req.body.question;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);

    const responseText = result.response.text();

    res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: error.toString() });
  }
});

app.get('*', () => {
    res.status(404).json({ msg: "bad request" });
})
module.exports = app;
