import { useEffect } from 'react'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useApikey } from '../../hooks/useApikey'

function SearchPlantplus() {
  const { apikey, InputApiKeyModal, open, setOpen } = useApikey('plantplus')
  useEffect(() => {
    if (!apikey && !open)
      setOpen(true)
  }, [open])
  return <div className="search-plantplus flex flex-col items-center">
    <SearchInput />
    <InputApiKeyModal />
  </div>
}

export default SearchPlantplus
