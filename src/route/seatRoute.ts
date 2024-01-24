import express from "express";
import { createSeats, readSeats } from "../controller/seatsController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/seat`, readSeats);

// adress for add new event
app.post(`/seat`, createSeats);

export default app;
