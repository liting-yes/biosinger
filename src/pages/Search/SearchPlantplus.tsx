import { useEffect } from 'react'
import { AutoComplete, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useApikey } from '../../hooks/useApikey'

function SearchPlantplus() {
  const { apikey, ApikeyInputModal, open, setOpen } = useApikey('plantplus')
  useEffect(() => {
    if (!apikey && !open)
      setOpen(true)
  }, [apikey, open, setOpen])
  return <div className="search-plantplus flex flex-col items-center">
    <AutoComplete className="w-full" allowClear>
      <Input size="large" prefix={<SearchOutlined className="text-xl text-slate-400 flex justify-center items-center" />} />
    </AutoComplete>
    <ApikeyInputModal />
  </div>
}

export default SearchPlantplus
