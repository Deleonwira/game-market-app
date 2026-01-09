import { Link} from 'react-router-dom';

import Data from "../../assets/data/dataAkun";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/react-loading-skeleton/dist/Skeleton.css"


const CardAkun = ({status, loading, voucher}) => {
  
  return (
    <section className='produk-unggulan'>
      <div className="akun-murah col">
      {
        loading?<Skeleton width={50} height={28}/>:<h3>
        Termurah
      </h3>
      }
      
      <div className="cards">
        {
          
          Data.map((data, i) =>
          
          data.status == null && data.harga <= 99000 ?
            CardTemplate(data, i, loading, Skeleton, voucher)
          : '')
        }
      </div>  
      </div>

      <div className="akun-sultan col">
      {
        loading?<Skeleton width={50} height={28}/>:<h3>
        Akun Sultan
      </h3>
      }
      
      <div className="cards">
        {
          
          Data.map((data, i) =>
          
          data.status == null && data.harga > 100000 ?
            CardTemplate(data, i, loading, Skeleton, voucher)
          : '')
        }
      </div>  
      </div>
    </section>
  )
}

function CardTemplate (data, i, loading, Skeleton, voucher){
  
  
  
  return(
  
    <div className="swiper-slide my-card " key={i}>
            {
              loading?<Skeleton width={132} height={90} borderRadius={10}/>:
              <img src={data.img} width="220" alt="" />
            }

            {
              loading?<Skeleton borderRadius={5} height={20} count={3}/>:
              <div className="my-body">
                
              
                <div className="my-top">
                {
                voucher?
                <p>Rp. {data.harga - (data.harga * 0.05)}</p>
                :
                <p>Rp. {data.harga}</p>
                }
                  
                  <h5>{data.judul}</h5>
                </div>
                
              
              
              <div className="my-mid">
                
              </div>
              <button className="my-btn-card">
                <Link to={`/dagangan/${data.cardId}`}>
                  <h5>DETAILS !</h5>
                </Link>
              </button>
              <div className="bottom"></div>
            </div>
            }
          
        </div>
  )
  

}

export default CardAkun



