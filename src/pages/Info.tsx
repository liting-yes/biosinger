import { useParams } from 'react-router-dom'

function Info() {
  const { nameCode } = useParams()

  return <div className="biosinger-info">Info: {nameCode}</div>
}

export default Info
