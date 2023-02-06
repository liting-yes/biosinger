import type { DbinfoItem } from '../../api'
import { useAtom } from 'jotai'
import { Card, List, Skeleton, Typography } from 'antd'
import { dbInfoAtom } from '../../stores/ncbi'

function NcbiEinfo() {
  const { Title, Text } = Typography
  const [dbInfo] = useAtom(dbInfoAtom)

  return (
    <div className="ncbi-einfo">
      <Title className="ml-4">Ncbi EInfo</Title>
      <Text className="mb-4 ml-4 inline-block">NCBI数据库基本信息</Text>
      <Skeleton
        className="ml-4"
        loading={ !Object.keys(dbInfo).length }
        active
        title
        round
        paragraph={{ rows: 8 }}
      />
      { Object.keys(dbInfo).length
        ? <List
            dataSource={ Object.values(dbInfo) }
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
