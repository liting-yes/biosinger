import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDebounceEffect } from 'ahooks'
import { Card, Collapse, message, theme } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { querySpeciesByNameCode } from '../api'
import type { QuerySp2000Response, QuerySpeciesByNameCodeData } from '../api'
import { useApikey } from '../hooks/useApikey'

function Info() {
  const { nameCode } = useParams()
  const { apikey } = useApikey('sp2000')
  const [info, setInfo] = useState<QuerySpeciesByNameCodeData>()

  useDebounceEffect(() => {
    const refresh = async () => {
      const res = await querySpeciesByNameCode({ apiKey: apikey!, nameCode: nameCode! })
      const { code, data, message: msg } = res.data as QuerySp2000Response
      if (code !== 200) {
        message.error(msg)
        return
      }
      setInfo(data as QuerySpeciesByNameCodeData)
    }
    refresh()
  }, [nameCode, apikey])

  const { Panel } = Collapse
  const { token } = theme.useToken()
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  return <div className="biosinger-info">
    <div className="biosinger-info__main  pt-8 w-4/5 max-w-7xl mx-auto">
      <Card title={info?.chineseName}>
        <p>学名：{info?.scientificName}</p>
        <p>俗名：{info?.CommonNames?.join(' / ')}</p>
        <p>分布地区：{info?.Distribution}</p>
        <p>界：{info?.taxonTree.kingdom}</p>
        <p>门：{info?.taxonTree.phylum}</p>
        <p>纲：{info?.taxonTree.class}</p>
        <p>目：{info?.taxonTree.order}</p>
        <p>科：{info?.taxonTree.family}</p>
        <p>属：{info?.taxonTree.genus}</p>
        <p>种：{info?.taxonTree.species}</p>
        {info?.taxonTree.infraspecies ? <p>种下：{info?.taxonTree.infraspecies}</p> : null}
        <Collapse
      bordered={false}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
    >
    { info?.Refs.length
      ? <Panel header="参考文献" key="1" style={panelStyle}>
        {info.Refs.map(item => <p key={Object.entries(item)[0].join(' ')}>{Object.entries(item)[0].join(' ')}</p>)}
      </Panel>
      : null}

    </Collapse>
      </Card>
    </div>
  </div>
}

export default Info
