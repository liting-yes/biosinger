const prefix = 'https://api.liting.ink/proxy/sp2000/v2'
const bioSp2000Key = useLocalStorage('bioSp2000', '')

interface Sp2000FamilyType {
    'family_c': string
    'phylum_c': string
    'superfamily': string
    'kingdom': string
    'record_id': string
    'phylum': string
    'kingdom_c': string
    'family': string
    'class': string
    'class_c': string
    'order_c': string
    'order': string
    'superfamily_c': string
}

interface Sp2000RefsType {
  [key: string]: string
}

interface Sp2000SpecieType {
  databases: string
  namecode: string
  scientificName: string
  author: string
  taxonTree: {
    kingdom: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    species: string
    infraspecies: string
  }
  Refs: Sp2000RefsType[]
  Synonyms: Array<{
    synonym: string
    refs: Sp2000RefsType[]
  }>
  CommonNames: string | string[]
  chineseName: string | string[]
  Distribution: string
  SpecialistInfo: Array<{
    name: string
    Institution: string
    'E-Mail': string
    Address: string
  }>
  searchCode: string
  searchCodeStatus: string
  dataquality: number
}

interface GetFamiliesByFamilyNameSp2000APIParameters {
    familyName: string | Ref<string>
    apiKey?: string
    page?: number
}

interface GetFamiliesByFamilyNameSp2000APIReturnType {
    code: number
    message: string
    data: {
      familes: Sp2000FamilyType[]
      limit: number
      count: number
      page: number
    }
}

export const getFamiliesByFamilyNameSp2000API = (parameters: GetFamiliesByFamilyNameSp2000APIParameters) => useFetch<GetFamiliesByFamilyNameSp2000APIReturnType>(`${ prefix }/getFamiliesByFamilyName`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
})

interface GetSpeciesByFamilyIdSp2000APIParameters {
    familyId: string | Ref<string>
    apiKey?: string
    page?: number
}

interface GetSpeciesByFamilyIdSp2000APIReturnType {
  code: number
  message: string
  data: {
    limit: number
    count: number
    page: number
    species: Sp2000SpecieType[]
  }
}

export const getSpeciesByFamilyIdSp2000API = (parameters: GetSpeciesByFamilyIdSp2000APIParameters) => useFetch<GetSpeciesByFamilyIdSp2000APIReturnType>(`${ prefix }/getSpeciesByFamilyId`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
})

interface GetSpeciesByScientificNameSp2000APIParameters {
  scientificName: string | Ref<string>
  apiKey?: string
  page?: number
}

interface GetSpeciesByScientificNameSp2000APIReturnType {
code: number
message: string
data: {
  limit: number
  count: number
  page: number
  species: Array<{
    accepted_name_info: Sp2000SpecieType
    name_code: string
    author: string
    name_status: string
    scientific_name: string
  }>
}
}

export const getSpeciesByScientificNameIdSp2000API = (parameters: GetSpeciesByScientificNameSp2000APIParameters) => useFetch<GetSpeciesByScientificNameSp2000APIReturnType>(`${ prefix }/getSpeciesByScientificName`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
})

interface GetSpeciesByCommonNameSp2000APIParameters {
  commonName: string | Ref<string>
  apiKey?: string
  page?: number
}

interface GetSpeciesByCommonNameSp2000APIReturnType {
code: number
message: string
data: {
  limit: number
  count: number
  page: number
  species: Array<{
    accepted_name_info: Sp2000SpecieType
    common_name: string
  }>
}
}

export const getSpeciesByCommonNameSp2000API = (parameters: GetSpeciesByCommonNameSp2000APIParameters) => useFetch<GetSpeciesByCommonNameSp2000APIReturnType>(`${ prefix }/getSpeciesByCommonName`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
})

interface GetSpeciesByNameCodeSp2000APIParameters {
  nameCode: string | Ref<string>
  apiKey?: string
}

interface GetSpeciesByNameCodeSp2000APIReturnType {
  code: number
  message: string
  data: Sp2000SpecieType
}

export const getSpeciesByNameCodeSp2000API = (parameters: GetSpeciesByNameCodeSp2000APIParameters) => useFetch<GetSpeciesByNameCodeSp2000APIReturnType>(`${ prefix }/getSpeciesByNameCode`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
})

interface GetNameByKeywordSp2000APIParameters {
  keyword: string | Ref<string>
  apiKey?: string
  page?: number
}

interface GetNameByKeywordSp2000APIReturnType {
  code: number
  message: string
  data: {
    limit: number
    count: number
    page: number
    names: Array<{
      name_c: string
      nameCode:string
      hierarchyCode: string
      name: string
      rank: string
      taxongroup: string
      parentId: string
      name_py: string
      pyabbr: string
    }>
  }
}

export const getNameByKeywordSp2000API = (parameters: GetNameByKeywordSp2000APIParameters) => useFetch<GetNameByKeywordSp2000APIReturnType>(`${ prefix }/getNameByKeyword`, {
  method: 'GET',
  params: { apiKey: bioSp2000Key.value, ...parameters },
  immediate: false
}
)
