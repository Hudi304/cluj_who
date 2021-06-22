import parse from 'csv-parse'
import fs from 'fs'

export abstract class CSVAbstractRepository {
  protected fs: any
  protected parser: any
  protected path

  constructor(path: string) {
    this.path = path
    this.initParse()
  }

  protected initParse() {
    this.fs = fs.createReadStream(this.path)
    this.parser = parse({ columns: true })
  }

  protected setParseFunctions(dataFunction: any, endFunction: any) {
    this.initParse()
    this.fs.pipe(this.parser).on('data', dataFunction).on('end', endFunction)
  }
}