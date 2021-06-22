import { CSVLeadRepository } from "../sources/csv/csv_lead_repository";
import { CSVResidenceLeadRepository } from "../sources/csv/csv_residence-lead_repository";
import { CSVResidenceRepository } from "../sources/csv/csv_residence_repository";
import { AxiosLeadRepository } from "../sources/es/axios/axios_es_lead_repository";
import { AxiosRedisenceRepository } from "../sources/es/axios/axios_es_residence_repository";
import { ElasticSearchLeadRepository } from "../sources/es/elastic/elastic_es_lead_repository";
import { ElasticSearchRedisenceRepository } from "../sources/es/elastic/elastic_es_residence_repository";
import LeadRepository from "./lead_repository";
import ResidenceRepository from "./residence_repository";

export const enum RepositoryType {
  CSV,
  AXIOS_ES,
  ELASTIC_ES
}

export function getLeadRepository(repoType: RepositoryType, path, index='d-1020-loc-ut'): LeadRepository {
  switch (repoType) {
      case RepositoryType.CSV: {
          return new CSVLeadRepository(path)
      }
      case RepositoryType.AXIOS_ES: {
          return new AxiosLeadRepository(index, path)
      }
      case RepositoryType.ELASTIC_ES: {
          return new ElasticSearchLeadRepository(index, path)
      }
  } 

}

export function getResidenceRepository(repoType: RepositoryType, path, index='d-1020-loc-ut'): ResidenceRepository{
  switch (repoType) {
    case RepositoryType.CSV: {

      // Just for test purpose
      let csvLeadRepo: CSVLeadRepository = new CSVLeadRepository('./src/leadData.csv')
      let csvRepoLeadRepo : CSVResidenceLeadRepository = new CSVResidenceLeadRepository('./src/ownershipData.csv')
          return new CSVResidenceRepository(path, csvLeadRepo, csvRepoLeadRepo)
      }
      case RepositoryType.AXIOS_ES: {
          return new AxiosRedisenceRepository(index, path)
      }
      case RepositoryType.ELASTIC_ES: {
          return new ElasticSearchRedisenceRepository(index, path)
      }
  } 

}