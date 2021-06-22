import { Lead } from "../models/lead";

export default interface LeadRepository{
  getLeadByName(name: string): Promise<Lead[]>
}