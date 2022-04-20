const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn");
const authroute = require("./Routes/Auth");
app.use(express.json());
app.use("/api",authroute);



// app.get("/", (req,res) =>{
//     res.send("Hello from node interview task");
// });
app.listen(port,() =>{
    console.log(`Server is running at ${port}`);
});