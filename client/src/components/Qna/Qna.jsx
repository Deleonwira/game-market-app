import React from 'react'
import { ReactDOM } from 'react'
import $ from 'jquery';
import ArrowDownIcon from '../../assets/icons/Qna/ArrowDownIcon';


//jquery









const Qna = () => {
    

  return (
    <section id='qna'>

    <div className="qna qna-1">
        <button className='button' onClick={ function() {
            $( ".p-qna-2, .p-qna-3, .p-qna-4, .p-qna-5 " ).hide("slow", function() {
                
            })
            $( ".p-qna-1" ).toggle( "slow", function() {
          // Animation complete.
        })}}>
            <h5>
                Lebih dekat dengan kami
            </h5>

            <ArrowDownIcon/>
        </button>

        <p className='p-qna p-qna-1'>Catmid adalah situs jual akun blox fruit, di mana kamu dapat membeli akun blox fruit. Dengan adanya situs ini, kamu akan merasa aman dengan transaksinya, karena CatMid 100% aman  </p>

    </div>

    <div className="qna qna-2">
        <button className='button' onClick={ function() {
            $( ".p-qna-1, .p-qna-3, .p-qna-4, .p-qna-5" ).hide("slow", function() {
                
            })
            $( ".p-qna-2" ).toggle( "slow", function() {
          // Animation complete.
        })}}>
            <h5>
                Cara beli akun
            </h5>

            <ArrowDownIcon/>
        </button>

        <p className='p-qna p-qna-2'>
            <li>Pilih akun yang ingin kamu beli</li>
            <li>Pastikan kamu membaca deskripsinya terlebih dahulu</li>
            <li>Jika sudah yakin dengan pilihanmu, Screenshot akun yang ingin kamu beli, dan tekan tombol beli sekarang pada halaman web</li>
            <li>Kamu akan diarahkan ke WhatsApp dari tim CatMid dan kirim screenshoot-an akun yang ingin dibeli</li>
        </p>

    </div>

    <div className="qna qna-3">
        <button className='button' onClick={ function() {
            $( ".p-qna-1, .p-qna-2, .p-qna-4, .p-qna-5" ).hide("slow", function() {
                
            })
            $( ".p-qna-3" ).toggle( "slow", function() {
          // Animation complete.
        })}}>
            <h5>
                Harganya Kemahalan?
            </h5>

            <ArrowDownIcon/>
        </button>

        <p className='p-qna p-qna-3'>Tenang aja, kamu bisa nego dengan klik tombol <a href="https://wa.me/6283103293225">Contact Me</a></p>

    </div>

    <div className="qna qna-4">
        <button className='button' onClick={ function() {
            $( ".p-qna-1, .p-qna-2, .p-qna-3, .p-qna-5" ).hide("slow", function() {
                
            })
            $( ".p-qna-4" ).toggle( "slow", function() {
          // Animation complete.
        })}}>
            <h5>
                Mau nitip Akun?
            </h5>

            <ArrowDownIcon/>
        </button>

        <p className='p-qna p-qna-4'>Bisa banget, chat <a href="https://wa.me/6283103293225">disini</a>untuk info lebih lanjut</p>

    </div>

    {/* <div className="qna qna-5">
        <button className='button' onClick={ function() {
            $( ".p-qna-1, .p-qna-3, .p-qna-4, .p-qna-2" ).hide("slow", function() {
                
            })
            $( ".p-qna-2" ).toggle( "slow", function() {
          // Animation complete.
        })}}>
            <h5>
                Cara rekber
            </h5>

            <ArrowDownIcon/>
        </button>

        <p className='p-qna p-qna-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis at ullam nesciunt nemo esse, architecto blanditiis nobis unde? Doloremque, dicta?</p>

    </div> */}
    </section>

    

  )
}



export default Qna