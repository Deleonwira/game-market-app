
import ArrowLeft from '../../assets/icons/ArrowLeftIcon'
import LoveIcon from '../../assets/icons/LoveIcon'
import FaebookIcon from '../../assets/icons/Footer/FaebookIcon';

const Navbar = () => {

  
    

  return (
    <section id='navbar'>

       
      
      
        <button className="left" onClick={() => window.history.back() }>
            <ArrowLeft/>
        </button>
        

      
        <button className="center"   onClick={() => window.location.href = '/'}>
      
    
              <h2>CatMid</h2>
            
        </button>
      
        <button className="right">
          <a href="https://www.facebook.com/profile.php?id=100081692648188">
            <FaebookIcon width={32}/>
          </a>
        </button>
    </section>
  )
}

export default Navbar