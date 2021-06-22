import LeadRepository from "../../../api/lead_repository";
import { Lead } from "../../../models/lead";
import { ESAbstractRepository } from "../abstract/es_abstract_repository";
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
import { FactoryRequestLead } from "../es_utils/es_factory_request_lead";
import { ESTransformer } from "../es_utils/es_transformer_models";

export class ElasticSearchLeadRepository extends ESAbstractRepository implements LeadRepository {
  private client: Client

  constructor(indexString: string, httpPatthES: string) {
    super(indexString, httpPatthES)
    this.client = new Client({ node: this.httpPatthES })
  }

  private createParamSearch(bodyRequest: any): RequestParams.Search {
    let param: RequestParams.Search = {
      index: this.indexString,
      body: bodyRequest
    }
    return param
  }

  async getLeadByName(name: string): Promise<Lead[]> {
    let bodyRequest: any = FactoryRequestLead.createBodyRequestSearchByName(this.bodybuilder, name)
    let param: RequestParams.Search = this.createParamSearch(bodyRequest)

    let leads: Lead[] = []
    await this.client.search(param)
      .then((result: ApiResponse) => {
        if (!this.validateResponse(result.body))
          return

        for (let i = 0; i < result.body.hits.hits.length; i++) {
          let partialListLeads = ESTransformer.dataESToLead(result.body.hits.hits[i]._source)
          partialListLeads.forEach(elem => {
            if (elem.fullName === name) {
              leads.push(elem)
            }

          })
        }
      })
      .catch((err: Error) => {
        console.log("Error at ES")
      })

    return leads

  }

}