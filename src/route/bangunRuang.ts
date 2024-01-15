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
import { validateTabung } from "../middleware/validateTabung";
import { validateKubus } from "../middleware/validateKubus";
import { validateBalok } from "../middleware/validateBalok";
import { validateBola } from "../middleware/validateBola";
const app = express();

app.use(express.json());
app.post(`/tabung/vol`, validateTabung, volTabung);
app.post(`/tabung/lp`, validateTabung, lpTabung);
app.post(`/kubus/vol`, validateKubus, volKubus);
app.post(`/kubus/lp`, validateKubus, lpKubus);
app.post(`/balok/vol`, validateBalok, volBalok);
app.post(`/balok/lp`, validateBalok, lpBalok);
app.post(`/bola/vol`, validateBola, volBola);
app.post(`/bola/lp`, validateBola, lpBola);
export default app;
