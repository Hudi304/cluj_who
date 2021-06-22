export class FactoryRequestLead {
  static createBodyRequestSearchByName(bodybuilder : any, name: string)
  {
    let bodyRequest = bodybuilder().query('term', 'People.StandardizedName.keyword', name).build()
    return bodyRequest
  }
}