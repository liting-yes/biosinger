import { message } from 'antd'
import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
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

  const usePlantplusQueryFidsByFamilyName = (familyName: string) => {
    return request(`/family/familyName/familyID/${familyName}/${apiKey}`)
  }

  const usePlantplusQueryTaxonIdsByFamilyId = (familyId: string) => {
    return request(`/taxon/familyID/taxonID/${familyId}/${apiKey}`)
  }

  const usePlantplusQueryTaxonIdsByScientificName = (scientificName: string) => {
    return request(`/taxon/scientificName/taxonID/${scientificName}/${apiKey}`)
  }

  const usePlantplusQueryTaxonIdsByCommonName = (commonName: string) => {
    return request(`/taxon/commonName/taxonID/${commonName}/${apiKey}`)
  }

  const usePlantplusQueryInfoByTaxonID = (taxonID: string) => {
    return request(`/taxon/species/taxonID/${taxonID}/${apiKey}`)
  }

  const usePlantplusQueryFamiliesByFamilyName = (familyName: string, page: number) => {
    return request({
      url: '/v2/getFamiliesByFamilyName',
      params: {
        familyName,
        apiKey,
        page,
      },
    })
  }

  const usePlantplusQuerySpeciesByFamilyId = (familyId: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByFamilyId',
      params: {
        familyId,
        apiKey,
        page,
      },
    })
  }

  const usePlantplusQuerySpeciesByScientificName = (scientificName: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByScientificName',
      params: {
        scientificName,
        apiKey,
        page,
      },
    })
  }

  const usePlantplusQuerySpeciesByCommonName = (commonName: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByCommonName',
      params: {
        commonName,
        apiKey,
        page,
      },
    })
  }

  const usePlantplusQuerySpeciesByNameCode = (nameCode: string) => {
    return request({
      url: '/v2/getSpeciesByNameCode',
      params: {
        nameCode,
        apiKey,
      },
    })
  }

  const usePlantplusQueryNameByKeyword = (keyword: string) => {
    return request({
      url: '/v2/getNameByKeyword',
      params: {
        keyword,
        apiKey,
      },
    })
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
