import type { Dbinfo, DbinfoItem, EInfo } from '../../api'
import { useAtom } from 'jotai'
import { Card, List, Skeleton, Typography, message } from 'antd'
import { useReducer, useState } from 'react'
import { dbListStore } from '../../stores/ncbi'
import { callNcbiEutilsEinfo } from '../../api'

function NcbiEinfo() {
  const { Title, Text } = Typography

  const [dbList] = useAtom(dbListStore)
  const [dbInfo, setDbInfo] = useReducer((state: Dbinfo, action: Dbinfo) => {
    const newDbinfo: Dbinfo = []
    action.forEach((db) => {
      if (!state.find(item => item.dbname === db.dbname))
        newDbinfo.push(db)
    })
    const newState = [...state, ...newDbinfo]
    newState.sort((a, b) => (a.dbname < b.dbname ? -1 : 1))
    return newState
  }, [])
  const [loading, setLoading] = useState(true)
  const [requestList, setRequestList] = useState<Array<Promise<void>>>([])

  if (dbList.length && !requestList.length) {
    dbList.forEach((db) => {
      const request = callNcbiEutilsEinfo({ db, retmode: 'json' }).then((res) => {
        if (res.status !== 200) {
          message.error(`获取数据库【${db}】信息失败：res.data.message`)
          return
        }
        setDbInfo((res.data as EInfo).einforesult.dbinfo)
      })
      setRequestList([...requestList, request])
    })
    setLoading(true)
    Promise.all(requestList).then().finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="ncbi-einfo">
      <Title className="ml-4">Ncbi EInfo</Title>
      <Text className="mb-4 ml-4 inline-block">NCBI数据库基本信息</Text>
      <Skeleton
        className="ml-4"
        loading={ loading }
        active
        title
        round
        paragraph={{ rows: 8 }}
      />
      { dbInfo.length
        ? <List
            dataSource={ dbInfo }
            grid={{ column: 2, gutter: -64 }}
            rowKey={ (item: DbinfoItem) => {
              return item.dbname
            } }
            renderItem = {
          (item: DbinfoItem) => {
            return (
              <Card
                className="m-4 bg-transparent"
                title={ <Text copyable className="border-none">{item.dbname}</Text> }
                headStyle={{ border: 'none' }}
                bodyStyle={{ paddingTop: 0 }}
                bordered={ false }
                hoverable
              >
                <div>
                  <span className="inline-block w-28 font-medium text-slate-700">简介: </span>
                  <Text className="flex-1 break-all text-slate-600">{item.description}</Text>
                </div>
                <div>
                  <span className="inline-block w-28 font-medium text-slate-700">最近跟新时间: </span>
                  <Text className="flex-1 break-all text-slate-600" >{item.lastupdate}</Text>
                </div>
                <div>
                  <span className="inline-block w-28 font-medium text-slate-700">信息量: </span>
                  <Text className="flex-1 break-all text-slate-600" >{item.count}</Text>
                </div>
              </Card>
            )
          }
        }
        />
        : null}
    </div>
  )
}

export default NcbiEinfo
