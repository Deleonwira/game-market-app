import React from 'react';
import BeliSekarangIcon from '../../assets/icons/Dagangan/BeliSekarangIcon';
import $ from 'jquery';
import { Link } from 'react-router-dom';


const DisplayDagangan = ({akunTunggal, voucher}) => {

    const [lebihBanyak, setLebihBanyak] = React.useState(true);

    function hideToogle(){
        $('.description').toggleClass('hide');

        if ($('.description').hasClass('hide')) {
            setLebihBanyak(true);
        } else {
            setLebihBanyak(false);
        }
    }

    window.scrollTo(0,0);
  return (
    
    <section id='dagangan'>
    <div className="start">
        <h1>{akunTunggal.judul}</h1>
        <div className="category">
            <p>Anti Hackback</p>
            <p>100% Aman</p>
        </div>
    </div>

    <div className="mid">
        <img src={akunTunggal.img} alt="" />
    </div>

    <div className="end">
        <div className="game-name">
            <h4>Roblox: Blox Fruit</h4>
        </div>

        <div className="price">
            {
                voucher? <h2>{akunTunggal.harga - (akunTunggal.harga * 0.05)}</h2>
                :
                <h2>{akunTunggal.harga}</h2>
            }
            

            <p className='sold'>Sold: {akunTunggal.sold}</p>
        </div>

        <h3>Deskripsi</h3>
        <div className="description hide">
            
            <ul>
                <p>
                    Level : <span>{akunTunggal.level}</span>
                </p>

                <p>
                    Beli : <span>{akunTunggal.currency.beli}</span>
                </p>

                <p>
                    Gamepass : <span>{akunTunggal.currency.gamepass}</span>
                </p>

                <p>
                    Fragment : <span>2,920</span>
                </p>

                <p>
                    Sword: <span>
                        {akunTunggal.items.sword}
                    </span>
                </p>

                <p>
                    Accessory: <span>
                        {akunTunggal.items.accessory}
                    </span>
                </p>

                <p>
                    Fruit: <span>
                        {akunTunggal.items.fruit}
                    </span>
                </p>


                <p>
                    Hand: <span>
                        {akunTunggal.items.hand}
                    </span>
                </p>

                <p>
                    Lainnya: <span>
                        {akunTunggal.items.lainnya}
                    </span>
                </p>
            </ul>

            <button className="lebih-banyak" onClick={() => hideToogle()}>

            {lebihBanyak ? '▼' : '▲'}

            </button>
            
        </div>
    </div>

    <div className="button">
            <a href='https://api.whatsapp.com/send/?phone=6283103293225&text&type=phone_number&app_absent=0'>
                <button>
                    <BeliSekarangIcon/>
                    <h3>Beli Sekarang!</h3>
                </button>
            </a>

            
        </div>
    

    
    
</section>
  )
}

export default DisplayDagangan