import Logo from '../assets/images/drift-logo.png';

function Header() {

  return (
    <header className='header'>
       
        <img src={Logo} alt="Logo"  className='header__image'/>
        
    </header>
  )
}

export default Header;
