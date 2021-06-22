
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'
import { Residence } from "../../../models/residence"
import ResidenceRepository from '../../../api/residence_repository'
import { ESTransformer } from '../es_utils/es_transformer_models'
import geoPoint from 'geo-point'
import { ESAbstractRepository } from '../abstract/es_abstract_repository'
import { FactoryRequestResidence } from '../es_utils/es_factory_request_residence'

export class ElasticSearchRedisenceRepository extends ESAbstractRepository implements ResidenceRepository {
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

  private async getResidences(param:  RequestParams.Search): Promise<Residence[]>
  {
    let residences: Residence[] = []

    await this.client.search(param)
    .then((result: ApiResponse) => {
      if (!this.validateResponse(result.body))
        return

      for (let i = 0; i < result.body.hits.hits.length; i++) {
        let residence: Residence = ESTransformer.dataESToResidence(result.body.hits.hits[i]._source)
        residences.push(residence)
      }
    })
    .catch(() => {
      console.log("Error at ES")
    })

    return residences
  }

  async searchByCenterAndRadius(center: geoPoint, radius: number): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByCenterAndRadius(this.bodybuilder, center, radius)
    let param: RequestParams.Search = this.createParamSearch(bodyRequest)

    return await this.getResidences(param)
  }


  async searchByRectangle(topLeft: geoPoint, bottomRight: geoPoint): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByRectangle(this.bodybuilder, topLeft, bottomRight)
    let param: RequestParams.Search = this.createParamSearch(bodyRequest)

    return await this.getResidences(param)
  }


  async searchByPolygon(points: geoPoint[]): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByPolygon(this.bodybuilder, points)
    let param: RequestParams.Search = this.createParamSearch(bodyRequest)

    return await this.getResidences(param)
  }

  async searcByAddress(address: string, state: string, zip: number): Promise<Residence> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchyAddress(this.bodybuilder, address, state, zip)
    let param: RequestParams.Search = this.createParamSearch(bodyRequest)

    let residence: Residence = new Residence()

    await this.client.search(param)
      .then((result: ApiResponse) => {
        if (!this.validateResponse(result.body))
          return
        residence = ESTransformer.dataESToResidence(result.body.hits.hits[0]._source)
      }).catch(() => {
        console.log("Error at ES")
      })
    return residence

  }

}
