import GeoPoint from "geo-point"

export class FactoryRequestResidence{
  static createBodyRequestSearchyAddress(bodybuilder : any,address: string, state: string, zip: number )
  {
    let bodyRequest = bodybuilder().query('term', 'StandardizedAddress.keyword', address).query('term', 'State.keyword', state).query('term', 'ZipCode.keyword', zip + "").build()
    return bodyRequest
  }

  static createBodyRequestSearchByCenterAndRadius(bodybuilder: any, center: GeoPoint, radius: number)
  {
    let bodyRequest = bodybuilder().query('match_all')
      .filter('geo_distance', {
        "distance": radius + "km",
        "Location": {
          "lat": center.latitude,
          "lon": center.longitude
        }
      }).build()
      return bodyRequest
  }

  static createBodyRequestSearchByRectangle(bodybuilder: any, topLeft: GeoPoint, bottomRight: GeoPoint)
  {
    let bodyRequest = bodybuilder().query('match_all')
      .filter('geo_bounding_box', {
        "Location": {
          "top_left": {
            "lat": topLeft.latitude,
            "lon": topLeft.longitude
          },
          "bottom_right": {
            "lat": bottomRight.latitude,
            "lon": bottomRight.longitude
          }
        }
      }).build()
    return bodyRequest
  }

  static createBodyRequestSearchByPolygon(bodybuilder: any, points: GeoPoint[])
  {
    let pointsLngLatFormat: (number[])[] = []
    points.forEach(point => {
      let listLngLat: number[] = []
      listLngLat.push(point.longitude)
      listLngLat.push(point.latitude)
      pointsLngLatFormat.push(listLngLat)
    })

    let bodyRequest = bodybuilder().query('match_all')
      .filter('geo_polygon', {
        "Location": {
          "points": pointsLngLatFormat
        }
      }).build()
    
    return bodyRequest
  }

  
}