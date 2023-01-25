import { useEffect } from 'react'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useApikey } from '../../hooks/useApikey'

function SearchPlantplus() {
  const { apikey, ApikeyInputModal, open, setOpen } = useApikey('plantplus')
  useEffect(() => {
    if (!apikey && !open)
      setOpen(true)
  }, [apikey, open, setOpen])
  return <div className="search-plantplus flex flex-col items-center">
    <SearchInput />
    <ApikeyInputModal />
  </div>
}

export default SearchPlantplus
