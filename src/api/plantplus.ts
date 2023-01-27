import Axios from 'axios'
import { request } from '../utils'
import type { UseAxiosOptions } from '../utils'

const instance = Axios.create({
  baseURL: 'http://www.sp2000.org.cn',
})

const request_ = (options: UseAxiosOptions) => {
  return request(options, {
    instance,
  })
}

export const queryFamiliesByFamilyName = (params: { familyName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getFamiliesByFamilyName', params })
}

export const querySpeciesByFamilyId = (params: { familyId: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByFamilyId', params })
}

export const querySpeciesByScientificName = (params: { scientificName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByScientificName', params })
}

export const querySpeciesByCommonName = (params: { commonName: string; page: number; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByCommonName', params })
}

export const querySpeciesByNameCode = (params: { nameCode: string; apiKey: string }) => {
  return request_({ url: '/v2/getSpeciesByNameCode', params })
}

export const queryNameByKeyword = (params: { keyword: string; apiKey: string }) => {
  return request_({ url: '/v2/getNameByKeyword', params })
}
