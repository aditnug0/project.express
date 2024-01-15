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
import { validatePersgi } from "../middleware/validate.Persgi";
import { validatePersgiPjg } from "../middleware/validatePersgiPjg";
import { validateLingkrn } from "../middleware/validateLingkrn";
import { validateSegitga } from "../middleware/validateSegitga";
const app = express();

/**allow read a body */
app.use(express.json());
/** fungsi use() digunakan untuk menerapkan sebuah fungsi pada object express,
 *  fungsi tersebut akan otomatis dijalankan */

app.post(`/lingkaran/luas`, validateLingkrn, luasLingkaran);
app.post(`/lingkaran/keliling`, validateLingkrn, kelilingLingkaran);
app.post(`/persegi/keliling`, validatePersgi, kelilingPersegi);
app.post(`/persegi/luas`, validatePersgi, luasPersegi);
app.post(`/persegip/keliling`, validatePersgiPjg, kelilingPersegiP);
app.post(`/persegip/luas`, validatePersgiPjg, luasPersegiP);
app.post(`/segitiga/luas`, validateSegitga, luasSegitiga);

export default app;
