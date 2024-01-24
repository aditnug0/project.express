import express from "express";
import { createSeats, deleteSeat, readSeats, updateSeat } from "../controller/seatsController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/seat`, readSeats);

// adress for add new event
app.post(`/seat`, createSeats);

app.put(`/seat/:seatID`, updateSeat);

app.delete(`/seat/:seatID`, deleteSeat);



export default app;
