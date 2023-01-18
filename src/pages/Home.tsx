import BiosingerHeader from '../components/Header/Header'

function Home() {
  return <div className='h-full'>
    <BiosingerHeader />
    <main className='h-full mt-16 flex justify-center items-center'>
      <span className='text-6xl'>Bio Singer</span>
    </main>
  </div>
}

export default Home
