import express from "express";
import { createEvent, readEvent, updateEvent, deleteEvent } from "../controller/eventController";
const app = express();

// allow to read json from the body
app.use(express.json());

// adress for get event data
app.get(`/event`, readEvent);

// adress for add new event
app.post(`/event`, createEvent);

// adress for update
app.put(`/event/:eventID`, updateEvent);

// adress for delete 
app.delete(`/event:/eventID`, deleteEvent);


export default app;
