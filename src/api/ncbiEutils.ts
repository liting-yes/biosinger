import type { UseAxiosOptions } from '../utils'
import Axios from 'axios'
import { request } from '../utils'

const instance = Axios.create({
  baseURL: 'https://api.liting.ink/proxy/ncbi/eutils',
})

const request_ = (options: UseAxiosOptions) => {
  return request(options, {
    instance,
  })
}

export const callNcbiEutilsEinfo = (params?: { db?: string; version?: string; retmode?: string }) => {
  return request_({ url: '/einfo', params })
}

export const callNcbiEutilsEsearch = (params: {
  db: string
  term: string
  usehistory?: string
  WebEnv?: string
  query_key?: string
  retstart?: string
  retmax?: string
  rettype?: string
  retmode?: 'json' | 'xml'
  sort?: string
  field?: string
  idtype?: string
  datetype?: string
  reldate?: number
  mindate?: string
  maxdate?: string
}) => {
  return request_({ url: '/esearch', params })
}

export const callNcbiEutilsEfetch = (params: {
  db: string
  id: string
  query_key?: string
  WebEnv?: string
  retmode?: 'text' | 'xml' | 'asn.1'
  rettype?:
  | 'docsum'
  | 'uilist'
  | 'xml'
  | 'full'
  | 'summary'
  | 'gene_table'
  | 'alignmentscores'
  | 'fasta'
  | 'homologene'
  | 'native'
  | 'acc'
  | 'seqid'
  | 'gb'
  | 'gbc'
  | 'gbwithparts'
  | 'fasta_cds_na'
  | 'gp'
  | 'gpc'
  | 'ipg'
  | 'medline'
  | 'abstract'
  | 'flt'
  | 'rsr'
  | 'ssexemplar'
  | 'chr'
  | 'clinvarset'
  | 'gtracc'
  retstart?: string
  retmax?: string
  strand?: string
  seq_start?: string
  seq_stop?: string
  complexity?: string
}) => {
  return request_({ url: '/efetch', params })
}

export const callNcbiEutilsEgquery = (params: {
  term: string
}) => {
  return request_({ url: '/egquery', params })
}
