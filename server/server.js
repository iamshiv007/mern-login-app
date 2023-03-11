import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** middlewares  */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powerd-by'); //less hackers know about our stack

const port = 8080

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/**API Routes */
app.use('/api', router)

/** Start server if database connected successfully*/

connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http//:localhost:${port}`)
        })
    } catch (err) {
        console.log("Cannot connect to the server")
    }}).catch(err => console.log("Invalid database connected...!"))
