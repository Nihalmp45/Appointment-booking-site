import express from 'express'
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";
import appointmentRoutes from './src/routes/appointmentRoute.js'
import connectToDB from './src/config.js/db.js';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
connectToDB();

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Enable CORS
app.use(cors());


// Routes
app.use('/api', appointmentRoutes);

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})