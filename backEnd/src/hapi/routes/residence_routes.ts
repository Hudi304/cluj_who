import {
  getResidenceRepository,
  RepositoryType,
} from "../../ds/api/repository_factory";
import ResidenceRepository from "../../ds/api/residence_repository";
import {
  searchByAdressHandler,
  searchByBoundingBoxHandler,
  searchByPolygonHandler,
  searchByRadiusHandler,
} from "../handlers/residence_handlers";
import { URL,INDEX } from "../../constants"


//! fisier constante
const esResidenceRepo: ResidenceRepository = getResidenceRepository(
  RepositoryType.ELASTIC_ES,
  URL,
  INDEX
);


export const residenceRoutes = [
  {
    method: "POST",
    path: "/residences/search_address",
    handler: searchByAdressHandler(esResidenceRepo),
  },
  {
    method: "POST",
    path: "/residences/search_radius",
    handler: searchByRadiusHandler(esResidenceRepo),
  },
  {
    method: "POST",
    path: "/residences/search_bounding_box",
    handler: searchByBoundingBoxHandler(esResidenceRepo),
  },
  {
    method: "POST",
    path: "/residences/search_polygon",
    handler: searchByPolygonHandler(esResidenceRepo),
  },
];


