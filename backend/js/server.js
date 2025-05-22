const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

//Allow requests from the frontend url
app.use(cors({ origin: ["http://localhost:5500", "http://127.0.0.1:5500"] }));
// Middleware to parse JSON in POST requests
app.use(express.json());

//--------------Endpoints--------------//
//++++++Default route++++++//
app.get("/", (req, res) => {
  res.send("Greetings from the backend!");
});

//++++++Receive and calculate addition operations++++++//
app.post("/adds", (req, res) => {
  const { num1, num2 } = req.body;
  //Validate inputs
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res
      .status(404)
      .json({ error: "Both num1 and num2 must be numbers!" });
  }

  //Process numbers and return result
  const result = num1 + num2;
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log("🌐 Server listening at localhost:3000");
});
