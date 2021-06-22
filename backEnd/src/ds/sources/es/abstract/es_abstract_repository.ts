import bodybuilderImported from 'bodybuilder'

export abstract class ESAbstractRepository{
  protected bodybuilder
  protected indexString: string
  protected httpPatthES: string
  
  constructor(indexString: string, httpPatthES: string)
  {
    this.bodybuilder = bodybuilderImported
    this.indexString = indexString
    this.httpPatthES = httpPatthES
  }

  validateResponse(response: any): boolean
  {
    if (!response)
      return false
    if (!response.hits)
      return false
    if (!response.hits.hits)
      return false
    if (response.hits.hits.length <= 0)
      return false
    return true
  }

}