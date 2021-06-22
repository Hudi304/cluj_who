
//! GET localholst .../residences/residence/{1}
//! GET localholst .../leads/lead/{1}
​
//! GET localholst .../leads
​
//! POST localholst .../residences?querry="searchByAdress"
    //? body{
    //?     state : strig 
    //?     address : string 
    //?     zipcode : number 
    //?     returnedFields? : string[] //(default all, returns object in JSON format 
    //?    }
​
//! POST localholst .../residences?querry="searchByRadius"
    //? body{
    //?     centerPoint : {Latitude : number, Longitude :  number}
    //?     radius : string(in km) | string(value + metric unit)
    //?     size? : number //(default 10)
    //?     returnedFields? : string[] //(default all, returns object in JSON format 
    //?    }    
​
//! POST localholst .../residences?querry="searchByBoundingBox"
    //? body{
    //?     topLatitude : number 
    //?     topLongitude :  number
    //?     bottomnLatitude : number 
    //?     bottomnLogitude :  number
    //?     size? : number //(default 10)
    //?     returnedFields? : string[] //(default all, returns object in JSON format 
    //?    }
​
//! POST localholst .../residences?querry=searchBPolygon
    //? body{
    //?     points : [number, number]
    //?     size? : number //(default 10)
    //?     returnedFields? : string[] //(default all) 
    //?    }


​