import { Typography } from 'antd'

function NcbiIndex() {
  const { Title, Paragraph, Link } = Typography

  return (
    <div className="ncbi-index">
      <Link href="https://www.ncbi.nlm.nih.gov" target="_blank">
        <Title>NCBI</Title>
      </Link>
      <Paragraph className="text-xl">
        The National Center for Biotechnology Information advances science and health by providing access to biomedical and genomic information.
      </Paragraph>
    </div>
  )
}

export default NcbiIndex
