import { EntityMapperDataBase } from "../decorators/entity_decorator";
import { DAO } from "./dao";

export abstract class GenericEntityRepository<T extends Object> extends DAO {
  private created: boolean
  private entity: T
  private nameEntityDataBase: string

  constructor(TCreator: new () => T) {
    super()
    this.entity = new TCreator()
    this.created = false
    this.nameEntityDataBase = EntityMapperDataBase.getNameEntity(this.entity)
  }

  private async initDataBase() {
    if (!this.created) {
      const create = EntityMapperDataBase.getCreateTableString(this.entity)
      await this.run(create)
      this.created = true
    }
  }

  private insertField(entity: T, field: string, values: any[]) {
    const type = Reflect.getMetadata("design:type", entity, field)
    if (type.name === "Date") {
      values.push(entity[field].toISOString())
    }
    else {
      values.push(entity[field])
    }
  }


  protected async insertEntity(entity: T): Promise<T> {
    await this.initDataBase()
    let insertString = `INSERT INTO ${this.nameEntityDataBase} `

    let fieldsString: string = "("
    let valuesString: string = "("
    let values: any[] = []
    const nameFileds = Object.getOwnPropertyNames(entity)

    nameFileds.forEach(field => {
      if (!EntityMapperDataBase.isRowId(this.entity, field)) {
        fieldsString += field + ","
        valuesString += "?,"
        this.insertField(entity, field, values)
      }
    })

    fieldsString = fieldsString.substring(0, fieldsString.length - 1) + ")"
    valuesString = valuesString.substring(0, valuesString.length - 1) + ")"
    insertString += `${fieldsString} VALUES ${valuesString}`
    let rowid: number = await this.run(insertString, values)
    return await this.getByRowId(rowid)
  }


  protected async updateEntity(entity: T): Promise<T> {
    await this.initDataBase()
    let updateString = `UPDATE ${this.nameEntityDataBase} SET `

    let values: any[] = []
    let rowid: number
    const nameFileds = Object.getOwnPropertyNames(entity)
    nameFileds.forEach(field => {
      if (!EntityMapperDataBase.isRowId(this.entity, field)) {
        updateString += field + "=?,"
        this.insertField(entity, field, values)
      }
      else {
        rowid = entity[field]
      }
    })

    updateString = updateString.substring(0, updateString.length - 1)
    updateString += ` WHERE rowid=?`
    values.push(rowid)
    await this.run(updateString, values)
    return entity
  }

  protected async deleteEntity(entity: T): Promise<T> {
    await this.initDataBase()
    let deleteString = `DELETE FROM ${this.nameEntityDataBase} WHERE rowid=?`

    let rowid: number
    const nameFileds = Object.getOwnPropertyNames(entity)
    nameFileds.forEach(field => {
      if (EntityMapperDataBase.isRowId(this.entity, field)) {
        rowid = entity[field]
      }
    })

    await this.run(deleteString, rowid)
    return entity
  }

  protected async findByOneArg(name: string, value: any): Promise<T[]> {
    await this.initDataBase()
    let selectString = `SELECT * FROM ${this.nameEntityDataBase} WHERE ${name} = ?`
    let entities: T[] = this.mapToEntity(await this.all(selectString, value))
    return entities
  }

  protected async findAllEntities(): Promise<T[]> {
    await this.initDataBase()
    let selectString = `SELECT * FROM ${this.nameEntityDataBase}`
    let entities: T[] = this.mapToEntity(await this.all(selectString, []))
    return entities
  }



  private mapToEntity(entitiesDataBase: any[]): T[] {
    if (!entitiesDataBase || entitiesDataBase.length == 0) {
      return []
    }

    let entities: T[] = []
    const nameFileds = Object.getOwnPropertyNames(entitiesDataBase[0])

    entitiesDataBase.forEach(elem => {
      nameFileds.forEach(field => {
        const type = Reflect.getMetadata("design:type", this.entity, field)
        if (type.name === "Date") {
          elem[field] = new Date(elem[field])
        }
      })
      entities.push(elem)
    })
    return entities
  }

  private async getByRowId(rowid: number) {
    await this.initDataBase()
    let selectString = `SELECT * FROM ${this.nameEntityDataBase} WHERE rowid = ?`
    const entity: T = await this.get(selectString, rowid)
    return entity
  }
}