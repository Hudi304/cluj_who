import GeoPoint from "geo-point"
import { Lead } from "../../../models/lead"
import { Residence } from "../../../models/residence"
import { CSVLeadFile, CSVResidenceFile } from "./csv_types"

export class CSVTransformer {
  static dataCsvToLead(data: CSVLeadFile): Lead {
    let lead: Lead = new Lead()
    lead.id = Number(data.id)
    lead.fullName = data.name
    lead.ethnicity = data.ethnicity
    lead.phoneNumber = data.phoneNumber
    lead.email = data.email
    lead.age = Number(data.age)
    return lead
  }

  static dataCsvToResidence(data: CSVResidenceFile): Residence {
    let residence: Residence = new Residence()

    let geoPoint: GeoPoint = new GeoPoint(Number(data.Lat), Number(data.Lng))

    residence.id = Number(data.Id)
    residence.address = data.Address
    residence.city = data.City
    residence.zip = Number(data.Zip)
    residence.state =  data.State
    residence.geoPoint = geoPoint
    residence.leads = new Map<Lead, boolean>()
    residence.buildDate = new Date(data.ConstructionDate),
    residence.value =  Number(data.Value)
    residence.landSurface = Number(data.propSurface)
    residence.houseSurface = Number(data.houseSurface)
    residence.income = Number(data.Income)
 
    return residence
  }
}