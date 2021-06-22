import GeoPoint from "geo-point"
import { Lead } from "../../../models/lead"
import { Residence } from "../../../models/residence"

export class ESTransformer {
  static dataESToResidence(responseData: any): Residence {
    let residence: Residence = new Residence()
    residence.id = Number(responseData.LocationID)
    residence.address = responseData.StandardizedAddress
    residence.city = responseData.City
    residence.zip = Number(responseData.ZipCode)
    residence.state = responseData.State
    residence.geoPoint = new GeoPoint(Number(responseData.Latitude), Number(responseData.Longitude))
    residence.leads = new Map<Lead, boolean>()
    residence.buildDate = new Date(responseData.HomeBuildYear)
    residence.value = Number(responseData.HomeValue)
    residence.landSurface =  Number(responseData.LandSquareFootage)
    residence.houseSurface = Number(responseData.HomeSize)
    residence.income =  Number(responseData.Income)

    let listLeads: Lead[] = ESTransformer.dataESToLead(responseData)

    listLeads.forEach(elem => {
      residence.addLead(elem, false)
    })

    // let listNameOwners: string[] = []
    // let assessor = responseData.Assessor[0]
    // let ownerString: string = "Owner1FullName"
    // let i: number = 2
    // while (assessor.ownerString != undefined) {

    // }
    return residence
  }

  static dataESToLead(responseData: any): Lead[] {
    let listPeoples = responseData.People
    let listLeads: Lead[] = []

    listPeoples.forEach((elem : any) => {
      let lead: Lead = new Lead()
      lead.id = Number(elem.IndividualID)
      lead.fullName = elem.StandardizedName
      lead.ethnicity = elem.EthnicCode
      lead.phoneNumber = elem.CellPhone
      lead.email = elem.Email
      lead.age = Number(elem.Age)
      listLeads.push(lead)
    })

    return listLeads
  }
}