import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Komponen CardSold - Menampilkan produk yang sudah terjual
 * @param {Array} data - Array of products from API (status: sold)
 * @param {boolean} loading - Loading state
 */
const CardSold = ({ data, loading }) => {
  // Show skeleton placeholders when loading
  const skeletonItems = Array(3).fill({});

  return (
    <section className="produk-unggulan cardsold">
      <h3>Habis Terjual</h3>

      <div className="cards">
        {loading
          ? skeletonItems.map((_, index) => (
              <div className="swiper-slide my-card card-1" key={`skeleton-${index}`}>
                <div className="image">
                  <Skeleton width={220} height={90} />
                </div>
                <div className="my-body">
                  <Skeleton height={20} count={3} />
                </div>
              </div>
            ))
          : data.map((product) => (
              <div className="swiper-slide my-card card-1" key={product.id}>
                <div className="image">
                  <img
                    src={product.thumbnail_url}
                    width="220"
                    alt={product.title}
                    className="habis"
                  />
                  <p className="text-habis">Habis</p>
                </div>

                <div className="my-body">
                  <div className="my-top">
                    <p>Rp {Number(product.price).toLocaleString('id-ID')}</p>
                    <h5>{product.title}</h5>
                  </div>

                  <div className="my-mid" />

                  <button className="my-btn-card">
                    <Link to={`/dagangan/${product.id}`}>
                      <h5>DETAILS !</h5>
                    </Link>
                  </button>

                  <div className="bottom" />
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

CardSold.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

CardSold.defaultProps = {
  data: [],
  loading: false,
};

export default CardSold;