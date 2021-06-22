import Hapi from "hapi";

export const validator = (request: Hapi.Request, headers: any) => {
  const  payload:any  =  request.payload;
  const { lat, lng } = payload;
  let valid = true;
  let message = `missing body parameters: `;
  if (!lat || !lng) {
    valid = false;
    if (!lat) {
      message += "lat";
    }
    if (!lng) {
      message += "lng";
    }
  }
  return {
    valid,
    message,
  };
};

export const searchByAddressReqValidator = (
  request: Hapi.Request, headers: any
) => {
  console.log("REQUEST : ", request.payload);
  const payload:any = request.payload;
  const { address, state, zip } = payload;
  let valid = true;
  let message = `missing body parameters: `;

  if (!address || !state || !zip) {
    valid = false;
    if (!address) {
      message += "address ";
    }
    if (!state) {
      message += "state ";
    }
    if (!zip) {
      message += "zip ";
    }
  }
  return {
    valid,
    message,
  };
};

export const searchByRadiusValidator = (
  request: Hapi.Request, headers: any
) => {
  console.log("REQUEST : ", request.payload);
  const  payload:any =  request.payload;
  const { centerPoint, radius } = payload;
  let valid = true;
  let message = `missing body parameters: `;

  if (!centerPoint.latitude || !centerPoint.longitude || !radius) {
    valid = false;
    if (!centerPoint.longitude) {
      message += "centerPoint.Latitude ";
    }
    if (!centerPoint.longitude) {
      message += "centerPoint.Longitude ";
    }
    if (!radius) {
      message += "radius ";
    }
  }
  return {
    valid,
    message,
  };
};

export const searchByBoundingBoxValidator = (
  request: Hapi.Request, headers: any
) => {
  console.log("REQUEST VALIDATOR : ", request.payload);
  const  payload:any =  request.payload;
  let valid = true;
  let message = `missing body parameters: `;

  if (
    !payload.top.latitude ||
    !payload.top.longitude ||
    !payload.bottomn.latitude ||
    !payload.bottomn.longitude
  ) {
    valid = false;
    if (!payload.top.latitude) {
      message += "top.Latitude ";
    }
    if (!payload.top.longitude) {
      message += "top.Longitude ";
    }
    if (!payload.bottomn.latitude) {
      message += "bottomn.Latitude ";
    }
    if (!payload.bottomn.longitude) {
      message += "bottomn.Longitude ";
    }
  } else {
    if (
      payload.top.latitude < payload.bottomn.latitude ||
      payload.top.longitude > payload.bottomn.longitude
    ) {
      valid = false;
      message =
        "bad points top.latitude must be smaller then bottomn.latitude and  top.longitude must be greater then bottomn.longitude";
    }
  }
  return {
    valid,
    message,
  };
};

//* ar trebui facuta o validare mai blana aici
//* ce se intampla cand se suprapun muchiile? 
export const searchByPolygonValidator = (
  request: Hapi.Request, headers: any
) => {
  console.log("REQUEST VALIDATOR : ", request.payload);
  const  payload:any = request.payload;
  let valid = true;
  let message = `missing body parameters: `;

  let points = payload.points;
  //console.log("POINTS", points.length);

  if (!payload.points) {
    valid = false;
    if (!payload.points) {
      message += "points[] : as array of lat|lon touples ";
    }
   
  } else {
    if (
      payload.points.length == 0 ||
      payload.points.length == 1 ||
      payload.points.length == 2
    ) {
      if (payload.points.length == 0) {
        message = "empty array : points ";
      }
      if (payload.points.length == 1) {
        message = "a point is not a polygon";
      }
      if (payload.points.length == 2) {
        message += "a line is not a true polygon  ";
      }
    }
  }
  return {
    valid,
    message,
  };
};
