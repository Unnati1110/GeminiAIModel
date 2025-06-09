const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json()); 

app.post("/getResponse", (req, res) => {
  const question = req.body.question; 

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  const genAI = new GoogleGenerativeAI('AIzaSyA7n5AQkuX0-47k7dhpr4UYhBbC-JQcH4Y');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  model.generateContent(question)
    .then((result) => {
      const responseText = result.response.text();
      res.status(200).json({ response: responseText });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to generate response" });
    });
});
