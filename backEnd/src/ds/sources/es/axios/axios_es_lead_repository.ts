import LeadRepository from "../../../api/lead_repository"
import { Lead } from "../../../models/lead"
import { ESAbstractRepository } from "../abstract/es_abstract_repository"
import { FactoryRequestLead } from "../es_utils/es_factory_request_lead"
import { ESTransformer } from "../es_utils/es_transformer_models"
import axios from 'axios'

export class AxiosLeadRepository extends ESAbstractRepository implements LeadRepository {
  private searchString: string

  constructor(indexString: string, httpPatthES: string) {
    super(indexString, httpPatthES)
    this.searchString = `${this.httpPatthES}/${this.indexString}/${"_search"}`
  }

  async getLeadByName(name: string): Promise<Lead[]> {
    let bodyRequest: any = FactoryRequestLead.createBodyRequestSearchByName(this.bodybuilder, name)

    let leads: Lead[] = []
    await axios.post(this.searchString, bodyRequest).then((result: any) => {
      if (!this.validateResponse(result.data))
        return

      for (let i = 0; i < result.data.hits.hits.length; i++) {
        let partialListLeads = ESTransformer.dataESToLead(result.data.hits.hits[i]._source)
        partialListLeads.forEach(elem => {
          if (elem.fullName === name)
            leads.push(elem)
        })
      }
    })
      .catch((err: Error) => {
        console.log("Error at Axios")
      })
    return leads

  }

}