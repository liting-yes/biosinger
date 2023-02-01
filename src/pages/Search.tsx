import type { ApiResponse, QueryNameByKeywordData, QueryNameByKeywordDataName } from '../api'
import { Button, Card, Input, List, Select, Tag, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDebounceFn, useLocalStorageState } from 'ahooks'
import { queryNameByKeyword } from '../api'

function Search() {
  const [sp2000Key, setSp2000Key] = useLocalStorageState<string | undefined>('biosinger_apikey_sp2000', {
    defaultValue: '',
  })
  const searchApiMap = [{
    label: '物种2000',
    key: 'sp2000',
    api: queryNameByKeyword,
    apiKey: sp2000Key,
    setApiKey: setSp2000Key,
  }]
  const [selectedApi, setSelectedApi] = useState(searchApiMap[0])
  const onSelectChange = (value: string) => {
    const nextSelectedApi = searchApiMap.find(item => item.key === value)
    setSelectedApi(nextSelectedApi!)
  }

  const [keyWord, setKeyWord] = useState('')
  const [data, setData] = useState<unknown>()
  const [listSource, setListSource] = useState<any[]>([])
  useEffect(() => {
    if (!data)
      return
    if (selectedApi.key === 'sp2000')
      setListSource((data as QueryNameByKeywordData).names)
  }, [data])
  const [loading, setLoading] = useState(false)
  const { run: triggerSearch } = useDebounceFn(async () => {
    let res: any
    setLoading(true)
    if (selectedApi.key === 'sp2000')
      res = await selectedApi.api({ keyword: keyWord, apiKey: selectedApi.apiKey })
    setLoading(false)
    const { data, code, message: msg } = res?.data as ApiResponse
    if (code !== 200) {
      message.error(msg)
      return
    }
    setData(data)
  })

  return (
    <div className="biosinger-search w-256 mx-auto pt-28">
      <div className="px-4 py-2 flex justify-between  bg-gradient-to-tr from-[#e0c3fc]/50 to-[#8ec5fc]/50 backdrop-blur rounded-xl">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span>数据库:</span>
            <Select defaultValue={ selectedApi.key } options={ searchApiMap.map(item => ({ value: item.key, label: item.label })) } onChange={ onSelectChange } />
          </div>
          <div className="flex items-center gap-2">
            <span>关键词:</span>
            <Input
              className="w-56"
              value={ keyWord }
              onChange={ e => setKeyWord(e.target.value) }
              onPressEnter={ triggerSearch }
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Key:</span>
            <Input.Password
              className="w-72"
              iconRender={ visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
              value={ sp2000Key }
              onChange={ e => setSp2000Key(e.target.value) }
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button
            type="primary"
            size="small"
            loading={ loading }
            onClick={ triggerSearch }
          >查询
          </Button>
        </div>
      </div>
      <List
        className="mt-12 p-4 bg-gradient-to-tr from-[#e0c3fc]/50 to-[#8ec5fc]/50 backdrop-blur rounded-xl"
        dataSource={ listSource }
        bordered={ true }
        grid={{ column: 2, gutter: -64 }}
        rowKey={ (item) => {
          if (selectedApi.key === 'sp2000')
            return (item as QueryNameByKeywordDataName).nameCode
          return ''
        } }
        renderItem ={ (item) => {
          if (selectedApi.key === 'sp2000') {
            return (
              <Card
                className="m-4"
                title={ (
                  <div className="flex items-center gap-2">
                    <span>{(item as QueryNameByKeywordDataName).name_c}</span>
                    <Tag color="#8ec5fc">{(item as QueryNameByKeywordDataName).rank}</Tag>
                    <Tag color="#e0c3fc">{(item as QueryNameByKeywordDataName).taxongroup}</Tag>
                  </div>
                ) }
                bordered={ false }
                hoverable={ true }
              >
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">学名: </span>
                  <span className="break-all flex-1 text-slate-600">{(item as QueryNameByKeywordDataName).name}</span>
                </div>
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">中文拼音: </span>
                  <span className="break-all flex-1 text-slate-600">{(item as QueryNameByKeywordDataName).name_py}</span>
                </div>
                <div className="flex">
                  <span className="inline-block w-20 font-medium text-slate-700">分类等级: </span>
                  <span className="break-all flex-1 text-slate-600">{(item as QueryNameByKeywordDataName).hierarchyCode}</span>
                </div>
              </Card>
            )
          }

          return 'null'
        } }
      />
    </div>
  )
}

export default Search

// background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
