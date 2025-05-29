const express = require("express");
const productRoute = require("./routes/productRoute");
const categoryRouter = require('./routes/categoryRoute')
const connectToDb = require("./config/connectToDb");
const blogRouter = require("./routes/blogPostRoute");
const userRoute = require("./routes/userRoute");
require('./services/nodemailer/transporter')
const cors = require("cors");
const handleError = require("./middlewares/handleError");
connectToDb()
const app = express();
app.use(express.json())
app.use(cors())
let PORT = 4000;
app.listen(PORT, ()=>{
  console.log("Running on Port" +" "+ PORT);
});




app.use("/categories", categoryRouter)
app.use("/products", productRoute)
app.use("/blogs", blogRouter)
app.use("/user", userRoute)

app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})

app.use(handleError)