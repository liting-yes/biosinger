import { useEffect, useState } from 'react'
import { AutoComplete, Button, Input, Spin, message } from 'antd'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import { useDebounceFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { useApikey } from '../../hooks/useApikey'
import { queryNameByKeyword } from '../../api'
import type { QueryNameByKeywordData, QuerySp2000Response } from '../../api'

function SearchSp2000() {
  const { apikey, ApikeyInputModal, open, setOpen } = useApikey('sp2000')
  useEffect(() => {
    if (!apikey && !open)
      setOpen(true)
  }, [apikey, open, setOpen])

  const [keyword, setkeyword] = useState<string>('')

  const [options, setOptions] = useState<{ value: string; label: string }[]>([])

  const [loading, setLoading] = useState(false)

  const { run: onSearch } = useDebounceFn(async () => {
    setLoading(true)
    const res = await queryNameByKeyword({ keyword, apiKey: apikey! })
    setLoading(false)
    const { code, data, message: msg } = res.data as QuerySp2000Response
    if (code !== 200) {
      message.error(msg)
      return
    }
    const list: { value: string; label: string }[] = (data as QueryNameByKeywordData).names?.map(name => ({ label: name.name_c, value: name.nameCode })) ?? []

    if (list.length)
      setOptions(list)
    else
      setOptions([{ label: '查无数据', value: 'null' }])
  })

  const navigate = useNavigate()
  const onSelect = (value: string) => {
    if (value === 'null')
      return
    navigate(`/info/${value}`)
  }

  return <div className="search-sp2000 flex flex-col items-center">
    <AutoComplete className="w-full" options={options} allowClear onSearch={onSearch} onSelect={onSelect}>
      <Input value={keyword} size="large" placeholder="请输入搜索关键词" prefix={ loading ? <Spin className="flex justify-center items-center" size="small"></Spin> : <SearchOutlined className="text-xl text-slate-400 flex justify-center items-center" />} suffix={ <Button shape="circle" size="small" type="ghost" icon={<SettingOutlined />} onClick={() => setOpen(true)} />} onChange={e => setkeyword(e.target.value)} />
    </AutoComplete>
    <ApikeyInputModal tooltip="搜索需要携带key，详情请查看 http://www.sp2000.org.cn/api/document" />
  </div>
}

export default SearchSp2000
