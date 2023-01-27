import { message } from 'antd'
import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import type { Options } from 'axios-hooks'
import { useState } from 'react'

const ESOECIES_API = 'http://www.sp2000.org.cn/api'

const request = makeUseAxios({
  axios: Axios.create({
    baseURL: ESOECIES_API,
  }),
})

// http://col.especies.cn/api/document
export function usePlantplus(initApikey: string) {
  const [apiKey, setApiKey] = useState(initApikey)
  if (!apiKey)
    message.error('物种多样性数据平台接口密钥为空').then(() => {}, () => {})

  const usePlantplusQueryFidsByFamilyName = (familyName: string, options?: Options) => {
    return request(`/family/familyName/familyID/${familyName}/${apiKey}`, options)
  }

  const usePlantplusQueryTaxonIdsByFamilyId = (familyId: string, options?: Options) => {
    return request(`/taxon/familyID/taxonID/${familyId}/${apiKey}`, options)
  }

  const usePlantplusQueryTaxonIdsByScientificName = (scientificName: string, options?: Options) => {
    return request(`/taxon/scientificName/taxonID/${scientificName}/${apiKey}`, options)
  }

  const usePlantplusQueryTaxonIdsByCommonName = (commonName: string, options?: Options) => {
    return request(`/taxon/commonName/taxonID/${commonName}/${apiKey}`, options)
  }

  const usePlantplusQueryInfoByTaxonID = (taxonID: string, options?: Options) => {
    return request(`/taxon/species/taxonID/${taxonID}/${apiKey}`, options)
  }

  const usePlantplusQueryFamiliesByFamilyName = (familyName: string, page: number, options?: Options) => {
    return request({
      url: '/v2/getFamiliesByFamilyName',
      params: {
        familyName,
        apiKey,
        page,
      },
    }, options)
  }

  const usePlantplusQuerySpeciesByFamilyId = (familyId: string, page: number, options?: Options) => {
    return request({
      url: '/v2/getSpeciesByFamilyId',
      params: {
        familyId,
        apiKey,
        page,
      },
    }, options)
  }

  const usePlantplusQuerySpeciesByScientificName = (scientificName: string, page: number, options?: Options) => {
    return request({
      url: '/v2/getSpeciesByScientificName',
      params: {
        scientificName,
        apiKey,
        page,
      },
    }, options)
  }

  const usePlantplusQuerySpeciesByCommonName = (commonName: string, page: number, options?: Options) => {
    return request({
      url: '/v2/getSpeciesByCommonName',
      params: {
        commonName,
        apiKey,
        page,
      },
    }, options)
  }

  const usePlantplusQuerySpeciesByNameCode = (nameCode: string, options?: Options) => {
    return request({
      url: '/v2/getSpeciesByNameCode',
      params: {
        nameCode,
        apiKey,
      },
    }, options)
  }

  const usePlantplusQueryNameByKeyword = (keyword: string, options?: Options) => {
    return request({
      url: '/v2/getNameByKeyword',
      params: {
        keyword,
        apiKey,
      },
    }, options)
  }

  return {
    apiKey,
    setApiKey,
    usePlantplusQueryFidsByFamilyName,
    usePlantplusQueryTaxonIdsByFamilyId,
    usePlantplusQueryTaxonIdsByScientificName,
    usePlantplusQueryTaxonIdsByCommonName,
    usePlantplusQueryInfoByTaxonID,
    usePlantplusQueryFamiliesByFamilyName,
    usePlantplusQuerySpeciesByFamilyId,
    usePlantplusQuerySpeciesByScientificName,
    usePlantplusQuerySpeciesByCommonName,
    usePlantplusQuerySpeciesByNameCode,
    usePlantplusQueryNameByKeyword,
  }
}
