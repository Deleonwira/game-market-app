import { Link } from 'react-router-dom';

import Data from "../../assets/data/dataAkun";
import Fruit from "../../assets/data/dataFruit";

const CardSold = () => {
  return (
    <section className='produk-unggulan cardsold'>
      <h3>
        Habis Terjual
      </h3>
      <div className="cards">
        {
          Data.map((data, i) =>
          
          data.status == "sold" ?
          (<div className="swiper-slide my-card card-1" key={i}>
            <div className="image">
                <img src={data.img} width="220" alt="" className='habis' />
                <p className='text-habis'>Habis</p>
            </div>
         
          <div className="my-body">
            <div className="my-top">
              <p>{data.harga}</p>
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
      </div>): '')
              }

      {
        Fruit.map((data, i) =>

        data.status == "sold" ?
        (<div className="swiper-slide my-card card-1" key={i}>
            <div className="image">
              <img className="habis" src={data.img} width={100} height={100} alt="" />
              <p className='text-habis'>Habis</p>
            </div>
            <div className="my-body">
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
        </div>): '')
      }

</div>
    </section>
  )
}

export default CardSold