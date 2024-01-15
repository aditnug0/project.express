import express from "express";
import { expression } from "joi";
import {
  lpBalok,
  lpBola,
  lpKubus,
  lpTabung,
  volBalok,
  volBola,
  volKubus,
  volTabung,
} from "../controller/bangunRuang";
const app = express();

app.use(express.json());
app.post(`/tabung/vol`, volTabung);
app.post(`/tabung/lp`, lpTabung);
app.post(`/kubus/vol`, volKubus);
app.post(`/kubus/lp`, lpKubus);
app.post(`/balok/vol`, volBalok);
app.post(`/balok/lp`, lpBalok);
app.post(`/bola/vol`, volBola);
app.post(`/bola/lp`, lpBola);
export default app;
