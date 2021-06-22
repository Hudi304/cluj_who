import GeoPoint from "geo-point";
import { Residence } from "../models/residence";

export default interface ResidenceRepository {
  searcByAddress(address: string, state: string, zip: number): Promise<Residence>
  searchByCenterAndRadius(center : GeoPoint, radius: number): Promise<Residence[]>
  searchByRectangle(topLeft: GeoPoint, bottomRight: GeoPoint): Promise<Residence[]>
  searchByPolygon(points: GeoPoint[]) : Promise<Residence[]>
}