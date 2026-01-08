
import header from '../../assets/images/Header/header.jpg'
import Skeleton from 'react-loading-skeleton'

const Header = ({loading}) => {
    
  return (
    
    <section id='header'>
        
        
        <div className="image-carousel">
            {    
            loading?<Skeleton height={356} width={1000} borderRadius={10}/>:
            <img src={header}  alt="" />
            }
        </div>
            
            <div className="title">
            <div className="text">
            {
                loading?<Skeleton height={32} width={150} borderRadius={5}/>:<h1>Blox Fruit</h1>
            }
            
            {
                loading?<Skeleton height={16} width={173} borderRadius={5}/>:<h5>Jual akun dan item blox fruits!</h5>
            }
                
                
            </div>

            {
                loading?<Skeleton height={28} width={173} borderRadius={10}/>:<a href="https://api.whatsapp.com/send/?phone=6283103293225&text&type=phone_number&app_absent=0">
                <button >
                    Contact Me!
                </button>
            </a>
            }
            
            
        </div>
        
        
    </section>
  )
}

export default Header