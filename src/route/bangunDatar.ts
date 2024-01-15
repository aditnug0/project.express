import express from "express";
import {
  kelilingLingkaran,
  kelilingPersegi,
  kelilingPersegiP,
  luasLingkaran,
  luasPersegi,
  luasPersegiP,
  luasSegitiga,
} from "../controller/bangunDatar";
const app = express();

/**allow read a body */
app.use(express.json());
/** fungsi use() digunakan untuk menerapkan sebuah fungsi pada object express,
 *  fungsi tersebut akan otomatis dijalankan */

app.post(`/lingkaran/luas`, luasLingkaran);
app.post(`/lingkaran/keliling`, kelilingLingkaran);
app.post(`/persegi/keliling`, kelilingPersegi);
app.post(`/persegi/luas`, luasPersegi);
app.post(`/persegip/keliling`, kelilingPersegiP);
app.post(`/persegip/luas`, luasPersegiP);
app.post(`/segitiga/luas`, luasSegitiga);

export default app;
