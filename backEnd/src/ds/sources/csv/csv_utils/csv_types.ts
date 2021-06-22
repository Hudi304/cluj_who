export type CSVResidenceFile = {
  Id: string
  Address: string
  City: string
  Zip: string
  State: string
  Lat: string
  Lng: string
  ConstructionDate: string
  Value: string
  Income: string
  propSurface: string
  houseSurface: string
}

export type CSVLeadFile = {
  id: string
  name: string
  age: string
  phoneNumber: string
  email: string
  ethnicity: string
}

export type CSVResidenceLeadFile = {
  residenceId: string
  leadId: string
  isOwner: string
}