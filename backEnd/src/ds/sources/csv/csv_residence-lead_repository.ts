import { CSVAbstractRepository } from "./abstract/csv_abstract_repository"
import { CSVResidenceLeadFile } from "./csv_utils/csv_types"



export class CSVResidenceLeadRepository extends CSVAbstractRepository {
  constructor(path: string) {
    super(path)
  }

  searcByResidenceId(residenceId: number): Promise<Map<number, boolean>> {
    return new Promise<Map<number, boolean>>((resolve, reject) => {
      let map = new Map<number, boolean>()
      let dataFunction = (data: CSVResidenceLeadFile) => {
        if (residenceId == Number(data.residenceId)) {
          map.set(Number(data.leadId), Boolean(JSON.parse(data.isOwner)))
        }
      }

      let endFunction = () => {
        if (map.size == 0)
          reject()
        else resolve(map)
      }
      this.setParseFunctions(dataFunction, endFunction)
    })
  }

}