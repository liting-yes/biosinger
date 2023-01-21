import { message } from 'antd'
import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

const ESOECIES_API = 'http://www.sp2000.org.cn/api'

const request = makeUseAxios({
  axios: Axios.create({
    baseURL: ESOECIES_API,
  }),
})

// http://col.especies.cn/api/document
export function useEspecies(apiKey: string) {
  if (!apiKey)
    message.error('物种多样性数据平台接口密钥为空')

  const useEspeciesQueryFidsByFamilyName = (familyName: string) => {
    return request(`/family/familyName/familyID/${familyName}/${apiKey}`)
  }

  const useEspeciesQueryTaxonIdsByFamilyId = (familyId: string) => {
    return request(`/taxon/familyID/taxonID/${familyId}/${apiKey}`)
  }

  const useEspeciesQueryTaxonIdsByScientificName = (scientificName: string) => {
    return request(`/taxon/scientificName/taxonID/${scientificName}/${apiKey}`)
  }

  const useEspeciesQueryTaxonIdsByCommonName = (commonName: string) => {
    return request(`/taxon/commonName/taxonID/${commonName}/${apiKey}`)
  }

  const useEspeciesQueryInfoByTaxonID = (taxonID: string) => {
    return request(`/taxon/species/taxonID/${taxonID}/${apiKey}`)
  }

  const useEspeciesQueryFamiliesByFamilyName = (familyName: string, page: number) => {
    return request({
      url: '/v2/getFamiliesByFamilyName',
      params: {
        familyName,
        apiKey,
        page,
      },
    })
  }

  const useEspeciesQuerySpeciesByFamilyId = (familyId: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByFamilyId',
      params: {
        familyId,
        apiKey,
        page,
      },
    })
  }

  const useEspeciesQuerySpeciesByScientificName = (scientificName: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByScientificName',
      params: {
        scientificName,
        apiKey,
        page,
      },
    })
  }

  const useEspeciesQuerySpeciesByCommonName = (commonName: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByCommonName',
      params: {
        commonName,
        apiKey,
        page,
      },
    })
  }

  const useEspeciesQuerySpeciesByNameCode = (nameCode: string, page: number) => {
    return request({
      url: '/v2/getSpeciesByNameCode',
      params: {
        nameCode,
        apiKey,
        page,
      },
    })
  }

  const useEspeciesQueryNameByKeyword = (keyword: string, page: number) => {
    return request({
      url: '/v2/getNameByKeyword',
      params: {
        keyword,
        apiKey,
        page,
      },
    })
  }

  return {
    useEspeciesQueryFidsByFamilyName,
    useEspeciesQueryTaxonIdsByFamilyId,
    useEspeciesQueryTaxonIdsByScientificName,
    useEspeciesQueryTaxonIdsByCommonName,
    useEspeciesQueryInfoByTaxonID,
    useEspeciesQueryFamiliesByFamilyName,
    useEspeciesQuerySpeciesByFamilyId,
    useEspeciesQuerySpeciesByScientificName,
    useEspeciesQuerySpeciesByCommonName,
    useEspeciesQuerySpeciesByNameCode,
    useEspeciesQueryNameByKeyword,
  }
}
