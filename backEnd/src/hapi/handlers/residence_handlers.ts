import {
  searchByAddressReqValidator,
  searchByBoundingBoxValidator,
  searchByPolygonValidator,
  searchByRadiusValidator,
} from "../routes/validators";
import Hapi from "hapi";
import GeoPoint from "geo-point";

import ResidenceRepository from "../../ds/api/residence_repository";

//! de hadeluit si request param optional SIZE

export const searchByAdressHandler = (repository: ResidenceRepository) => {
  //? new connection to the db if it's the case
  //? pt MONGO
  console.log("searchByAdressHandler");

  return async function (request: Hapi.Request, headers: any) {
    //validate request
    const  payload:any  = request.payload;
    const { address, state, zip } = payload;

    const validationResult = searchByAddressReqValidator(request, headers);
    console.log(validationResult);
    if (validationResult.valid) {
      //heavy duty stack overflow based on request
      console.log(request);
      return repository.searcByAddress(address, state, zip);
    } else {
      return {
        status: 400,
        message: `Bad Request: ${validationResult.message}`,
      };
    }
  };
};

export const searchByRadiusHandler = (repository: ResidenceRepository) => {
  //? new connection to the db if it's the case
  //? pt MONGO
  console.log("searchByRadiusHandler");
  return async function (request: Hapi.Request, headers: any) {
    //validate request
    const  payload:any  = request.payload;
    console.log(payload);

    const { radius, centerPoint } = payload;
    let center = new GeoPoint(
      Number(centerPoint.latitude),
      Number(centerPoint.longitude)
    );

    const validationResult = searchByRadiusValidator(request, headers);
    console.log(validationResult);
    if (validationResult.valid) {
      //heavy duty stack overflow based on request
      console.log(request);
      return repository.searchByCenterAndRadius(center, Number(radius));
    } else {
      return {
        status: 400,
        message: `Bad Request: ${validationResult.message}`,
      };
    }
  };
};

export const searchByBoundingBoxHandler = (repository: ResidenceRepository) => {
  //? new connection to the db if it's the case
  //? pt MONGO
  console.log("searchByBoundingBoxHandler");

  return async function (request: Hapi.Request, headers: any) {
    //validate request
    const validationResult = searchByBoundingBoxValidator(request, headers);
    const  payload:any  = request.payload;
    console.log("top.latitude : ", Number(payload.top.latitude));

    const topLat = Number(payload.top.latitude);
    const topLon = Number(payload.top.longitude);
    const botLat = Number(payload.bottomn.latitude);
    const botLon = Number(payload.bottomn.longitude);

    let topPoint = new GeoPoint(topLat, topLon);
    let bottomnPoint = new GeoPoint(botLat, botLon);

    console.log("VALDATION", validationResult);
    if (validationResult.valid) {
      return repository.searchByRectangle(topPoint, bottomnPoint);
    } else {
      return {
        status: 400,
        message: `Bad Request: ${validationResult.message}`,
      };
    }
  };
};

export const searchByPolygonHandler = (repository: ResidenceRepository) => {
  //? new connection to the db if it's the case
  //? pt MONGO
  console.log("searchByPolygonHandler");

  return async function (request: Hapi.Request, headers: any) {
    //validate request
    const validationResult = searchByPolygonValidator(request, headers);
    const  payload:any  = request.payload;
    console.log("VALDATION", validationResult);
    let gps =  pointsToGeoPoints(payload.points)
    console.log(gps)
    if (validationResult.valid) {
      return repository.searchByPolygon(gps);
    } else {
      return {
        status: 400,
        message: `Bad Request: ${validationResult.message}`,
      };
    }
  };
};

function pointsToGeoPoints(points: any[]): GeoPoint[] {
  let ret : GeoPoint[] = []
  points.forEach(point => {
    let gp = new GeoPoint(Number(point.latitude), Number(point.longitude))
    ret.push(gp)
  })
  return ret
}
