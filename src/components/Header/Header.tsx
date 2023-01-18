import Logo from '../../assets/icons/logo.svg'

function Header() {
  return <div className="fixed w-full h-16 bg-white/50 shadow backdrop-blur px-4 flex flex-row justify-between items-center">
    <div>
      <img className="w-12 h-12" src={Logo} />
    </div>
    <div>
     <a href="https://github.com/liting-yes/biosinger.git" target="_blank">
      <div className='i-mdi:github w-8 h-8'/>
     </a>
    </div>
  </div>
}

export default Header
