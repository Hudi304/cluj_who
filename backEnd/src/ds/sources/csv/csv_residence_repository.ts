import ResidenceRepository from "../../api/residence_repository";
import { CSVAbstractRepository } from "./abstract/csv_abstract_repository"
import { Lead } from "../../models/lead";
import { Residence } from "../../models/residence";
import { CSVLeadRepository } from "./csv_lead_repository";
import { CSVResidenceLeadRepository } from "./csv_residence-lead_repository";
import GeoPoint from "geo-point";
import { CSVResidenceFile } from "./csv_utils/csv_types";
import { CSVTransformer } from "./csv_utils/csv_transformer_models";


export class CSVResidenceRepository extends CSVAbstractRepository implements ResidenceRepository {
  private leadRepo: CSVLeadRepository
  private residenceLeadRepo: CSVResidenceLeadRepository

  constructor(path: string, leadRepo: CSVLeadRepository, residenceLeadRepo: CSVResidenceLeadRepository) {
    super(path)
    this.leadRepo = leadRepo
    this.residenceLeadRepo = residenceLeadRepo
  }
  searchByCenterAndRadius(center: GeoPoint, radius: number): Promise<Residence[]> {
    throw new Error("Method not implemented.");
  }
  searchByRectangle(topLeft: GeoPoint, bottomRight: GeoPoint): Promise<Residence[]> {
    throw new Error("Method not implemented.");
  }
  searchByPolygon(points: GeoPoint[]): Promise<Residence[]> {
    throw new Error("Method not implemented.");
  }
  


  async searcByAddress(address: string, state: string, zip: number): Promise<Residence> {
    let promise =  new Promise<Residence>((resolve, reject) => {

      let dataFunction = async (data: CSVResidenceFile) => {
        if (address == data.Address && state == data.State && zip == Number(data.Zip)) {
          this.parser.destroy()

          let residence: Residence = CSVTransformer.dataCsvToResidence(data)

          if (residence.id) {
            let map: Map<number, boolean> = await this.residenceLeadRepo.searcByResidenceId(residence.id)

            for (let key of map.keys()) {
              let lead: Lead = await this.leadRepo.searcById(key)
              let isOwner: boolean | undefined = map.get(key)
              if (isOwner != undefined)
                residence.addLead(lead, isOwner)
            }

            resolve(residence)
          }
        }
        else {
          reject()
        }
      }

      let endFunction = () => {
        reject()
      }
      this.setParseFunctions(dataFunction, endFunction)
    })
    let result :Residence = new Residence()
    await promise.then(elem => result =elem, () => console.log("Not found residence - CSV")).catch (err => console.log(err))
    return result
  }

}