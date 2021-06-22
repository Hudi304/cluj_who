import GeoPoint from "geo-point"
import { Lead } from "./lead"

export class Residence {
    id?: number
    address?: string
    city?: string
    zip?: number
    state?: string
    geoPoint? : GeoPoint
    leads?: Map<Lead, boolean>
    buildDate?: Date
    value?: number
    landSurface?: number
    houseSurface?: number
    income? : number

    
    addLead(lead: Lead, isOwner: boolean) {
        if (this.leads == undefined)
            this.leads = new Map<Lead, boolean>()
        this.leads.set(lead, isOwner)
    }
}