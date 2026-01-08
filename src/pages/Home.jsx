import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section id='home'>

      <Helmet>
      <title>Beli Akun & Items Blox Fruit | CatMid Store</title>
    <meta
      name="description"
      content="Menyediakan Akun & items Blox Fruit dengan harga terjangkau. Catmid menjanjikan proses transaksi dengan aman dan terpercaya."
    />
    <meta
      name="keywords"
      content="blox fruit, roblox, items, fruit, akun blox fruit, roblox"
    />
      </Helmet>
        <div className="top">
          <h1>
            <span>Cat</span>Mid
          </h1>
        </div>

        <div className="center">
          <img src='https://i.pinimg.com/564x/af/d7/58/afd758fe06536d122198c4440abd8c0b.jpg' alt="" />
        </div>

        <div className="bottom">
          <div className="game-title">
            <h2><span>Akun & Items </span>Roblox: Blox Fruit</h2>
            <p>Menyediakan Akun & items Blox Fruit dengan harga terjangkau. Catmid menjanjikan proses transaksi dengan aman dan terpercaya. Pembelian dapat dilakukan dengan cara mengklik tombol contact me!. </p>
          </div>
          <div className="button">
          <button>
            <Link to={'/blox-fruit'}>
            <h5>Get Started</h5>
            </Link>
          </button>
          </div>
          
        </div>
    </section>
  )
}

export default Home