import type { ApiResponse, QueryNameByKeywordData, QueryNameByKeywordDataName, QuerySpeciesByScientificNameDataSpecie } from '../api'
import { Button, Card, Divider, Input, List, Modal, Select, Tag, Typography, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDebounceEffect, useDebounceFn, useLocalStorageState } from 'ahooks'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { queryNameByKeyword, querySpeciesByScientificName } from '../api'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

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
  const [selectedApi, setSelectedApi] = useState(searchApiMap.find(item => item.key === searchParams.get('db')) ?? searchApiMap[0])
  const onSelectChange = (value: string) => {
    const nextSelectedApi = searchApiMap.find(item => item.key === value)
    setSelectedApi(nextSelectedApi!)
    setSearchParams({ db: nextSelectedApi!.key, keyword: keyWord })
  }

  const [keyWord, setKeyWord] = useState(searchParams.get('keyword') ?? '')
  const [listSource, setListSource] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { run: triggerSearch } = useDebounceFn(async () => {
    setSearchParams({ db: selectedApi!.key, keyword: keyWord })
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
    if (!data)
      return
    if (selectedApi.key === 'sp2000')
      setListSource((data as QueryNameByKeywordData).names)
  })

  const navigate = useNavigate()
  useDebounceEffect(() => {
    navigate(`/search?db=${selectedApi.key}&keyword=${keyWord}`)
  }, [selectedApi, keyWord])

  const [visible, setVisible] = useState(false)
  const { Title, Paragraph, Text } = Typography

  const [genusModalVisivle, setGenusModelVisible] = useState(false)
  const [searchScientificName, setSearchScientificName] = useState('')
  const [speciesList, setSepciesList] = useState<QuerySpeciesByScientificNameDataSpecie[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [count, setCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loadingSearchScientificName, setLoadingSearchScientificName] = useState(false)
  useEffect(() => {
    setHasMore(page * limit < count)
  }, [limit, count, page])
  const { run: onClickAtGenus } = useDebounceFn(async (scientificName: string) => {
    scientificName && setSearchScientificName(scientificName)
    if (!scientificName)
      return
    setLoadingSearchScientificName(true)
    const res = await querySpeciesByScientificName({ scientificName: scientificName ?? searchScientificName, page, apiKey: selectedApi.apiKey! })
    setLoadingSearchScientificName(false)
    const { data, code, message: msg } = res?.data as ApiResponse
    if (code !== 200) {
      message.error(msg)
      return
    }
    if (!data || data.count === 0) {
      message.info('查无数据')
      return
    }
    if (selectedApi.key === 'sp2000') {
      setPage(data.page)
      setLimit(data.limit)
      setCount(data.count)
      if (page === 1)
        setSepciesList(data.species)
      else
        setSepciesList([...speciesList, ...data.species])
    }

    setGenusModelVisible(true)
  })
  const { run: onClickLoadingMore } = useDebounceFn(() => {
    setPage(page + 1)
    onClickAtGenus(searchScientificName)
  })

  return (
    <div className="biosinger-search mx-auto w-256 py-28">
      <div className="flex justify-between rounded-xl from-[#4facfe]/30 to-[#00f2fe]/30 bg-gradient-to-tr px-4 py-2 shadow-lg backdrop-blur">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span>数据库:</span>
            <Select defaultValue={ selectedApi.key } options={ searchApiMap.map(item => ({ value: item.key, label: item.label })) } onChange={ onSelectChange } />
          </div>
          <div className="flex items-center gap-2">
            <span>关键词:</span>
            <Input.Search
              className="w-56"
              value={ keyWord }
              onChange={ e => setKeyWord(e.target.value) }
              onPressEnter={ triggerSearch }
              loading={ loading }
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
            <QuestionCircleOutlined className="h-4 w-4" onClick={ () => setVisible(true) } />
            <Modal
              open={ visible }
              focusTriggerAfterClose={ false }
              okText="知道了"
              onCancel={ () => setVisible(false) }
              footer={ <Button type="primary" onClick={ () => setVisible(false) }>知道了</Button> }
            >
              <Typography>
                <Title className="text-3xl!">Key值介绍</Title>
                <Paragraph>
                  调用公共API常需要一个 API Key 来鉴别请求者身份，以防止API被恶意请求
                </Paragraph>
                <Divider >
                  <span>本站点涉及以下Key</span>
                </Divider>
                <Title className="text-xl!">SP2000</Title>
                <Paragraph>
                  物种2000中国节点是国际物种2000项目的一个地区节点，2006年2月7日由国际物种2000秘书处提议成立，于2006年10月20日正式启动。中国科学院生物多样性委员会（BC-CAS），与其合作伙伴一起，支持和管理物种2000中国节点的建设，其在线数据库提供了中国已知的动物，植物，真菌和微生物的信息。
                  API Key 相关信息请查看：<Typography.Link href="http://www.sp2000.org.cn/api/document" target="_blank">API服务说明</Typography.Link>
                </Paragraph>
              </Typography>
            </Modal>
          </div>
        </div>
        <div className="flex items-center justify-end">
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
        className="mt-12 rounded-xl from-[#4facfe]/20 to-[#00f2fe]/20 bg-gradient-to-tr p-4 backdrop-blur"
        dataSource={ listSource }
        grid={{ column: 2, gutter: -64 }}
        rowKey={ (item: QueryNameByKeywordDataName) => {
          if (selectedApi.key === 'sp2000')
            return item.nameCode
          return ''
        } }
        renderItem ={ (item: QueryNameByKeywordDataName) => {
          if (selectedApi.key === 'sp2000') {
            const getCardExtra = (item: QueryNameByKeywordDataName) => {
              if (item.rank === 'Species' || item.rank === 'Infraspecies')
                return <Link to={ `/info/${item.nameCode}` } >详细信息</Link>
              else if (item.rank === 'Genus')
                return <Button className="p-0" type="ghost" onClick={ () => onClickAtGenus(item.name) } >相关种列表</Button>
              return null
            }

            return (
              <Card
                className="m-4"
                title={ (
                  <div className="flex items-center gap-2">
                    <span>{item.name_c}</span>
                    <Tag color="#8ec5fc">{item.rank}</Tag>
                    <Tag color="#e0c3fc">{item.taxongroup}</Tag>
                  </div>
                ) }
                bordered={ false }
                hoverable={ true }
                extra={ getCardExtra(item) }
              >
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">学名: </span>
                  <Text className="flex-1 break-all text-slate-600" copyable>{item.name}</Text>
                </div>
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">中文拼音: </span>
                  <span className="flex-1 break-all text-slate-600">{item.name_py}</span>
                </div>
                <div className="flex">
                  <span className="inline-block w-20 font-medium text-slate-700">分类等级: </span>
                  <span className="flex-1 break-all text-slate-600">{item.hierarchyCode.split('_').join(' -> ')}</span>
                </div>
              </Card>
            )
          }

          return 'null'
        } }
      />
      <Modal
        open={ genusModalVisivle }
        focusTriggerAfterClose={ false }
        closable={ false }
        onCancel={ () => setGenusModelVisible(false) }
        footer={ hasMore ? <Button type="primary" onClick={ onClickLoadingMore } loading={ loadingSearchScientificName }>加载更多</Button> : null }
      >
        <List
          dataSource={ speciesList }
          grid={{ column: 1 }}
          rowKey={ (item: any) => {
            return item.nameCode
          } }
          renderItem ={ (item: QuerySpeciesByScientificNameDataSpecie) => {
            return (
              <Card
                className="m-4"
                title={ <span>{item.accepted_name_info.chineseName}</span> }
                bordered={ false }
                hoverable={ true }
                extra={ <Link to={ `/info/${item.accepted_name_info.namecode}` } >详细信息</Link> }
              >
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">学名: </span>
                  <Text className="flex-1 break-all text-slate-600" copyable>{item.scientific_name}</Text>
                </div>
                {
                  item.accepted_name_info.CommonNames?.length
                    ? (
                      <div>
                        <span className="inline-block w-20 font-medium text-slate-700">俗名: </span>
                        <span className="flex-1 break-all text-slate-600">{item.accepted_name_info.CommonNames.join(' | ')}</span>
                      </div>
                      )
                    : null
                }

                <div className="flex">
                  <span className="inline-block w-20 font-medium text-slate-700">分类地区: </span>
                  <span className="flex-1 break-all text-slate-600">{item.accepted_name_info.Distribution}</span>
                </div>
              </Card>
            )
          } }
        />
      </Modal>
    </div>
  )
}

export default Search
