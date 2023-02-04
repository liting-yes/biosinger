import type { UseAxiosOptions } from '../utils'
import Axios from 'axios'
import { request } from '../utils'

const instance = Axios.create({
  baseURL: 'https://api.liting.ink/proxy/sp2000',
})

const request_ = (options: UseAxiosOptions) => {
  return request(options, {
    instance,
  })
}

export interface QuerySp2000Response {
  code: number
  message: string
  data: any
}

export interface TaxonTree {
  kingdom: string
  phylum: string
  class: string
  order: string
  family: string
  genus: string
  species: string
  infraspecies: string
}

export const queryFamiliesByFamilyName = (params: { familyName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getFamiliesByFamilyName', params })
}

export const querySpeciesByFamilyId = (params: { familyId: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByFamilyId', params })
}

export type QuerySpeciesByFamilyIdDataSpeciesSynonyms = { synonym: string; refs: { [key: string]: string }[] }[]

export interface QuerySpeciesByFamilyIdDataSpecie {
  Synonyms: QuerySpeciesByScientificNameDataSpeciesSynonyms
  databases: string
  namecode: string
  scientificName: string
  author: string
  Refs: { [key: string]: string }[]
  taxonTree: TaxonTree
  searchCode: string
  CommonNames: string[]
  searchCodeStatus: string
  Distribution: string
  chineseName: string
  dataquality: number
}

export interface QuerySpeciesByFamilyIdData {
  species: QuerySpeciesByScientificNameDataSpecie[]
  limit: number
  count: number
  page: number
}

export const querySpeciesByScientificName = (params: { scientificName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByScientificName', params })
}

export interface QuerySpeciesByScientificNameDataSpecie {
  accepted_name_info: QuerySpeciesByFamilyIdDataSpecie
  name_code: string
  author: string
  name_status: string
  scientific_name: string
}

export const querySpeciesByCommonName = (params: { commonName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByCommonName', params })
}

export const querySpeciesByNameCode = (params: { nameCode: string; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByNameCode', params })
}

export interface QuerySpeciesByCommonNameData {
  species: { name_code: string }
  limit: number
  count: number
  page: number
}

export interface QuerySpeciesByNameCodeData {
  searchCodeStatus: string
  searchCode: string
  scientificName: string
  author: string
  taxonTree: TaxonTree
  Refs: { [key: string]: string }[]
  Synonyms: { synonym: string; refs: { [key: string]: string }[] }[]
  CommonNames: string[]
  chineseName: string[]
  Distribution: string
  SpecialistInfo: { name: string; Institution: string; 'E-Mail': string; Address: string }[]
}

export const queryNameByKeyword = (params: { keyword: string; apiKey?: string; page?: number }) => {
  return request_({ url: '/v2/getNameByKeyword', params })
}
export interface QueryNameByKeywordDataName {
  hierarchyCode: string
  name: string
  nameCode: string
  name_c: string
  name_py: string
  parentId: string
  pyabbr: string
  rank: string
  taxongroup: string
}

export interface QueryNameByKeywordData {
  count: number
  limit: number
  page: number
  names: QueryNameByKeywordDataName[]
}
