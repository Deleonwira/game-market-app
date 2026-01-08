import React from 'react'
import Data from '../../assets/data/dataFruit.json'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'


const CardFruit = ({loading}) => {
  return (
    <section className='produk-unggulan cardfruit'>
    {
      loading?<Skeleton width={50} height={20}/>:<h3>
      Fruit
    </h3>
    }
      
      <div className="cards">
        {
          Data.map((data, i) => 
          data.status == null ?
              (<div className="swiper-slide my-card card-1" key={i}>
          <img src={data.img} width={100} height={100} alt="" />
          <div className="my-body">
            <h5>{data.judul} Fruit</h5>
            <div className="my-top">
              <p className='fruit-price'>{data.harga}</p>
              <span> Sold: {data.sold}</span>
            </div>
            <div className="my-mid">
              
            </div>
            
            <button className="my-btn-card">
            <Link to={'https://wa.me/6283103293225'}>
                <h5>Contact  !</h5>
            </Link>
            </button>
            
            <div className="bottom"></div>
          </div>
      </div>) :''
            )
        }
        
      

</div>
    </section>
  )
}

export default CardFruit