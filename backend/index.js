const express = require('express')
const app = express()
const cors = require('cors')


const mongoose =  require('mongoose')
const port = process.env.PORT || 5000
require('dotenv').config()

//middlware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'], // Removed trailing slash
    credentials: true
  }));


//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoute = require('./src/users/user.route');

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/auth',userRoute);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send("book server");
    })
}

main().then(() => console.log("db connected")).catch(err => console.log(err));



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})