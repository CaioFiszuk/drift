import Logo from '../assets/images/drift-logo.png';

function Header({handleSignOut}) {

  return (
    <header className='header'>
       
        <img src={Logo} alt="Logo"  className='header__image'/>

        <button className='header__button' onClick={handleSignOut}>Sign Out</button>
        
    </header>
  )
}

export default Header;
