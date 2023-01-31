import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'

function Home() {
  return <div className="biosinger-home h-full pt-64  bg-gradient-to-tr  from-[#a6c0fe] to-[#f68084] flex justify-center">
      <Texty className="inline-block text-8xl text-white">Bio Singer</Texty>
    </div>
}

export default Home

// background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
