import LeadRepository from "../../api/lead_repository"
import { Lead } from "../../models/lead"
import { CSVAbstractRepository } from "./abstract/csv_abstract_repository"
import { CSVTransformer } from "./csv_utils/csv_transformer_models"
import { CSVLeadFile } from "./csv_utils/csv_types"

export class CSVLeadRepository extends CSVAbstractRepository implements LeadRepository {
  constructor(path: string) {
    super(path)
  }


  getLeadByName(name: string): Promise<Lead[]> {
    return new Promise<Lead[]>((resolve, reject) => {
      let leads : Lead[] = []
      let dataFunction = (data: CSVLeadFile) => {
        if (name == data.name) {
          leads.push(CSVTransformer.dataCsvToLead(data))
        }
      }

      let endFunction = () => {
        if (leads.length == 0)
          reject()
        else resolve(leads)
      }
      this.setParseFunctions(dataFunction, endFunction)
    })
  }

  searcById(id : number): Promise<Lead> {
    return new Promise<Lead>((resolve, reject) => {

      let dataFunction = (data: CSVLeadFile) => {
        if (id == Number(data.id)) {
          this.parser.destroy()
          resolve(CSVTransformer.dataCsvToLead(data))
        }
      }

      let endFunction = () => {
        reject()
      }
      this.setParseFunctions(dataFunction, endFunction)
    })
  }

}