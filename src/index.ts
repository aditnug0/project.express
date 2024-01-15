/*ini adalah file utama untuk menjalankan server backend */
/** import library express */
import express, { Request, Response, query, response } from "express";
import { request } from "http";
import { number } from "joi";
import { validateCube } from "./middleware/validateCube";
import routeBangunDatar from "./route/bangunDatar";
import routeBangunRuang from "./route/bangunRuang";
/**buat wadah inisiasi express */

const app = express();

/** mendefinisikan PORT berjalannya server */
const PORT = 8000;
// new code pleaase add to note
/** allow to read JSON as request */
app.use(express.json());

/**proses pertama untuk handle request */
app.get(`/serena`, (request: Request, response: Response) => {
  /**ini adalah proses handle request dengan url adress
   * url adress :https//localhost:8000/serena
   * method get
   */

  //memberi respon
  return response.status(200).json({
    message: `Hello Serena 👉👈`,
  });
});

// new code
/**query request  */
app.get(`/moklet`, (request: Request, response: Response) => {
  /**asumsikan data yang dikirim adalah nama dan umur */
  // http://localhost:8000/moklet
  let nama: any = request.query.nama?.toString();
  let umur: any = request.query.umur?.toString();

  let message: String = `My name is ${nama} and i'm ${umur} years old`;
  return response.status(200).json(message);
});

/** read data request from parameter */
app.get(`/telkom/:nama/:gender`, (request: Request, response: Response) => {
  // http://localhost:8000/telkom/John/male
  let nama: string = request.params.nama;
  let gender: string = request.params.gender;
  let message: string = `My name is ${nama} and i'm ${gender}`;
  return response.status(200).json(message);
});

/**request from body */
app.post(`/moklet`, (request: Request, response: Response) => {
  /**asumsikan data yang dikirim adalah panjang dan lebar */
  // http://localhost:8000/moklet pake yang post
  let panjang: number = request.body.panjang;
  let lebar: number = request.body.lebar;
  let luasPersegiPanjang: number = panjang * lebar;
  let message = `Luas Persegi panjang adalah ${luasPersegiPanjang}`;
  return response.status(200).json(message);
});
/**buatlah request untuk mengubah suhu celcius ke fahrenheit, kelvin, dan reamur menggunakan request parameter
 * exp : http://localhost:8000/celcius/80
 * (80 adalah nilai celciusnya)
 * response data ->
 * {
 * reamur: ?, fahrenheit: ?, kelvin: ?
 * }
 */

app.get(`/degree/:celcius`, (request: Request, response: Response) => {
  //http://localhost:8000/celcius/80
  let celcius: number = Number(request.params.celcius);
  let fahrenheit: number = (9 / 5) * celcius + 32;
  let kelvin: number = celcius + 273.15;
  let reamur: number = (4 / 5) * celcius;
  let message = `Celcius = ${celcius}, Reamur = ${reamur}, Fahrenheit = ${fahrenheit}, Kelvin = ${kelvin} `;
  return response.status(200).json(message);
});

/**create request for count volume of long cube */
app.post(`/balok`, validateCube, (request: Request, response: Response) => {
  /** create panjang lebar tinggi */
  let panjang: number = Number(request.body.panjang);
  let lebar: number = Number(request.body.lebar);
  let tinggi: number = Number(request.body.tinggi);

  let volume: number = panjang * lebar * tinggi;
  return response.status(200).json({
    panjang,
    lebar,
    tinggi,
    volume,
  });
});

/** register route of bangun datar */
app.use(routeBangunDatar);
app.use(routeBangunRuang);

/**run server  */
app.listen(PORT, () => {
  console.log(`😋 Server running on port ${PORT}`);
});
// 🔰
