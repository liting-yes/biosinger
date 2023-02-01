import type { ApiResponse, QueryNameByKeywordData, QueryNameByKeywordDataName } from '../api'
import { Button, Card, Divider, Input, List, Modal, Select, Tag, Typography, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useDebounceFn, useLocalStorageState } from 'ahooks'
import { Link } from 'react-router-dom'
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
  const [listSource, setListSource] = useState<any[]>([])
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
    if (!data)
      return
    if (selectedApi.key === 'sp2000')
      setListSource((data as QueryNameByKeywordData).names)
  })

  const [visible, setVisible] = useState(false)
  const { Title, Paragraph } = Typography

  return (
    <div className="biosinger-search w-256 mx-auto py-28">
      <div className="px-4 py-2 flex justify-between  bg-gradient-to-tr from-[#e0c3fc]/50 to-[#8ec5fc]/50 backdrop-blur rounded-xl">
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
            <QuestionCircleOutlined className="w-4 h-4" onClick={ () => setVisible(true) } />
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
                  <span className="break-all flex-1 text-slate-600">{item.name}</span>
                </div>
                <div>
                  <span className="inline-block w-20 font-medium text-slate-700">中文拼音: </span>
                  <span className="break-all flex-1 text-slate-600">{item.name_py}</span>
                </div>
                <div className="flex">
                  <span className="inline-block w-20 font-medium text-slate-700">分类等级: </span>
                  <span className="break-all flex-1 text-slate-600">{item.hierarchyCode}</span>
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
