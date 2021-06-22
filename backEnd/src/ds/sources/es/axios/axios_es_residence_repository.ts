import { Residence } from "../../../models/residence"
import ResidenceRepository from '../../../api/residence_repository'
import { ESTransformer } from '../es_utils/es_transformer_models'
import geoPoint from "geo-point"
import { ESAbstractRepository } from "../abstract/es_abstract_repository"
import { FactoryRequestResidence } from "../es_utils/es_factory_request_residence"
import axios from 'axios'

export class AxiosRedisenceRepository extends ESAbstractRepository implements ResidenceRepository {
  private searchString : string

  constructor(indexString: string, httpPatthES: string) {
    super(indexString, httpPatthES)
    this.searchString = `${this.httpPatthES}/${this.indexString}/${"_search"}`
  }

  private async getResidences(bodyRequest: any): Promise<Residence[]>
  {
    let residences: Residence[] = []

    await axios.post(this.searchString, bodyRequest).then((result: any) => {
      if (!this.validateResponse(result.data))
        return

      let residences: Residence[] = []
      for (let i = 0; i < result.data.hits.hits.length; i++) {
        let residence: Residence = ESTransformer.dataESToResidence(result.data.hits.hits[i]._source)
        residences.push(residence)

      }
    })
      .catch((err: Error) => {
        console.log("Error at Axios")
      })

    return residences
  }

  async searchByCenterAndRadius(center: geoPoint, radius: number): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByCenterAndRadius(this.bodybuilder, center, radius)
    return await this.getResidences(bodyRequest)
  }


  async searchByRectangle(topLeft: geoPoint, bottomRight: geoPoint): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByRectangle(this.bodybuilder, topLeft, bottomRight)
    return await this.getResidences(bodyRequest)
  }

  async searchByPolygon(points: geoPoint[]): Promise<Residence[]> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchByPolygon(this.bodybuilder, points)
    return await this.getResidences(bodyRequest)
  }


  async searcByAddress(address: string, state: string, zip: number): Promise<Residence> {
    let bodyRequest: any = FactoryRequestResidence.createBodyRequestSearchyAddress(this.bodybuilder, address, state, zip)
    let residence: Residence = new Residence()

      await axios.post(this.searchString, bodyRequest).then((result: any) => {
        if (!this.validateResponse(result.data))
          return

        residence = ESTransformer.dataESToResidence(result.data.hits.hits[0]._source)
      }).catch((err: Error) => {
        console.log("Error at Axios")
      })

    return residence
  }

}
