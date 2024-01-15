import { Request, Response, request } from "express";

/**const atau let digunakan untuk mendeklarasikan sebuah variabel atau object atau array atau function */
const luasLingkaran = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const r: number = Number(request.body.r);
    const luas = phi * r * r;
    return response.status(200).json({
      staus: true,
      r,
      luas,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const kelilingLingkaran = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const r: number = Number(request.body.r);
    const keliling = 2 * phi * r;
    return response.status(200).json({
      staus: true,
      r,
      keliling,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const kelilingPersegi = (request: Request, response: Response) => {
  try {
    const s: number = Number(request.body.s);
    const kelilingp = s * 4;
    return response.status(200).json({
      staus: true,
      s,
      kelilingp,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const luasPersegi = (request: Request, response: Response) => {
  try {
    const s: number = Number(request.body.s);
    const luasp = s * s;
    return response.status(200).json({
      staus: true,
      s,
      luasp,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const luasPersegiP = (request: Request, response: Response) => {
  try {
    const l: number = Number(request.body.l);
    const p: number = Number(request.body.p);
    const luaspp = p * l;
    return response.status(200).json({
      staus: true,
      p,
      l,
      luaspp,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const kelilingPersegiP = (request: Request, response: Response) => {
  try {
    const l: number = Number(request.body.l);
    const p: number = Number(request.body.l);
    const kelilingpp = 2 * p + l;
    return response.status(200).json({
      staus: true,
      p,
      l,
      kelilingpp,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};
const luasSegitiga = (request: Request, response: Response) => {
  try {
    const a: number = Number(request.body.a);
    const t: number = Number(request.body.t);
    const luasst = (1 / 2) * (a * t);
    return response.status(200).json({
      staus: true,
      a,
      t,
      luasst,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export {
  luasLingkaran,
  kelilingLingkaran,
  luasPersegi,
  kelilingPersegi,
  kelilingPersegiP,
  luasPersegiP,
  luasSegitiga,
};
