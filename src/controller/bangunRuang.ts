import { Request, Response } from "express";
import { request } from "http";

const volTabung = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const rt: number = Number(request.body.rt);
    const t: number = Number(request.body.t);
    const volume = phi * rt * rt * t;
    return response.status(200).json({
      staus: true,
      rt,
      t,
      volume,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const lpTabung = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const rt: number = Number(request.body.rt);
    const t: number = Number(request.body.t);
    const lpTabung = 2 * phi * rt * (rt + t);
    return response.status(200).json({
      staus: true,
      rt,
      t,
      lpTabung,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const volKubus = (request: Request, response: Response) => {
  try {
    const s: number = Number(request.body.s);
    const volume = s * s * s;
    return response.status(200).json({
      staus: true,
      s,
      volume,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const lpKubus = (request: Request, response: Response) => {
  try {
    const s: number = Number(request.body.s);
    const lpKubus = s * s * 6;
    return response.status(200).json({
      staus: true,
      s,
      lpKubus,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const volBalok = (request: Request, response: Response) => {
  try {
    const p: number = Number(request.body.p);
    const l: number = Number(request.body.l);
    const t: number = Number(request.body.t);
    const volbalok = p * l * t;
    return response.status(200).json({
      staus: true,
      p,
      l,
      t,
      volbalok,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const lpBalok = (request: Request, response: Response) => {
  try {
    const p: number = Number(request.body.p);
    const l: number = Number(request.body.l);
    const t: number = Number(request.body.t);
    const lpBalok = 2 * (p * l) + l * t + p * t;
    return response.status(200).json({
      p,
      l,
      t,
      lpBalok,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const volBola = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const rb: number = Number(request.body.rb);
    const volBola = (4 / 3) * phi * rb * rb * rb;
    return response.status(200).json({
      staus: true,
      rb,
      volBola,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const lpBola = (request: Request, response: Response) => {
  try {
    const phi = Math.PI;
    const rb: number = Number(request.body.rb);
    const lpBola = 4 * phi * rb * rb;
    return response.status(200).json({
      staus: true,
      rb,
      lpBola,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};
export {
  volTabung,
  lpTabung,
  volKubus,
  lpKubus,
  volBalok,
  lpBalok,
  volBola,
  lpBola,
};
