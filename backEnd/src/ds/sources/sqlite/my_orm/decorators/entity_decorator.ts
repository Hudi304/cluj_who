const mapNamesDataBase: Map<string, string> = new Map<string, string>()
const mapPrimaryKeys: Map<string, string[]> = new Map<string, string[]>()
const mapUniques: Map<string, string[]> = new Map<string, string[]>()

export class EntityMapperDataBase {
  static getNameEntity<T extends Object>(entity: T) {
    return mapNamesDataBase.get(entity.constructor.name)
  }

  static isRowId<T extends Object>(entity: T, nameField: string): boolean {
    if (mapPrimaryKeys.get(entity.constructor.name).includes(nameField) &&
      EntityMapperDataBase.getTypeSqlLite(entity, nameField) === "INTEGER") {
      return true
    }
    return false
  }

  static addMapListString(target: Object, key: string, map: Map<string, string[]>) {
    let keys = map.get(target.constructor.name)
    if (!keys) {
      let keys: string[] = []
      keys.push(key)
      map.set(target.constructor.name, keys)
    }
    else {
      if (keys.includes(key)) {
        return
      }
      map.get(target.constructor.name).push(key)
    }
  }

  private static getTypeSqlLite<T extends Object>(entity: T, field: string): string {
    const type = Reflect.getMetadata("design:type", entity, field)
    if (type.name === "String")
      return "TEXT"
    if (type.name === "Number")
      return "INTEGER"
    if (type.name === "Date")
      return "TEXT"
    return "TEXT"
  }

  static getCreateTableString<T extends Object>(entity: T): string {
    const nameEntity = entity.constructor.name
    let create: string = `CREATE TABLE IF NOT EXISTS ${mapNamesDataBase.get(nameEntity)} (`

    const nameFileds = Object.getOwnPropertyNames(entity)
    nameFileds.forEach(field => {
      let partialString = `${field} ${EntityMapperDataBase.getTypeSqlLite(entity, field)}`
      if (mapUniques.get(nameEntity).includes(field)) {
        partialString += " UNIQUE"
      }

      partialString += ","
      create += partialString
    })

    const primaryKeys = mapPrimaryKeys.get(nameEntity)
    let primaryKeyString = "PRIMARY KEY("
    primaryKeys.forEach(key => {
      primaryKeyString += `${key},`
    })
    primaryKeyString = primaryKeyString.substring(0, primaryKeyString.length - 1) + ")"
    create += primaryKeyString + ");"

    return create
  }
}


// The decorators for entities
export function EntitySqlLite(name: string) {
  return function (constructor: Function) {
    if (!mapNamesDataBase.get(constructor.name)) {
      mapNamesDataBase.set(constructor.name, name)
    }
  }
}

export function PrimaryKeySqlLite(target: Object, key: string) {
  EntityMapperDataBase.addMapListString(target, key, mapPrimaryKeys)
}

export function UniqueSqlLite(target: any, key: string) {
  EntityMapperDataBase.addMapListString(target, key, mapUniques)
}

