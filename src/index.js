const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user")
const accountRouter = require("./routers/account")

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(userRouter)
app.use(accountRouter)


app.listen(port, () => {
    console.log("Server is up on port " + port);
});

