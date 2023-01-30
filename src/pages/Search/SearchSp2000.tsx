import { useEffect, useState } from 'react'
import { AutoComplete, Input, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
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

  const [messageApi] = message.useMessage()

  const { run: onSearch } = useDebounceFn(async () => {
    const res = await queryNameByKeyword({ keyword, apiKey: apikey! })
    const { code, data, message } = res.data as QuerySp2000Response
    if (code !== 200) {
      await messageApi.error(message)
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
    navigate(`/info/${value}`)
  }

  return <div className="search-sp2000 flex flex-col items-center">
    <AutoComplete className="w-full" options={options} allowClear onSearch={onSearch} onSelect={onSelect}>
      <Input value={keyword} size="large" prefix={<SearchOutlined className="text-xl text-slate-400 flex justify-center items-center" />} onChange={e => setkeyword(e.target.value)} />
    </AutoComplete>
    <ApikeyInputModal tooltip="搜索需要携带key，详情请查看 http://www.sp2000.org.cn/api/document" />
  </div>
}

export default SearchSp2000