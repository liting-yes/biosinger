import { AutoComplete, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function SearchInput() {
  return <div className="search-input w-2/3">
    <AutoComplete allowClear>
      <Input size="large" prefix={<SearchOutlined className="text-xl text-slate-400 flex justify-center items-center" />} />
    </AutoComplete>
  </div>
}

export default SearchInput
