import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Komponen CardFruit - Menampilkan daftar fruit yang tersedia
 * @param {Array} data - Array of products from API (filtered for fruits)
 * @param {boolean} loading - Loading state
 */
const CardFruit = ({ data, loading }) => {
  // Filter products that have 'fruit' in title or attributes
  const fruits = data.filter((item) => 
    item.title?.toLowerCase().includes('fruit') || 
    item.attributes?.fruit
  );

  // Show skeleton placeholders when loading
  const skeletonItems = Array(3).fill({});

  return (
    <section className="produk-unggulan cardfruit">
      {loading ? (
        <Skeleton width={50} height={20} />
      ) : (
        <h3>Fruit</h3>
      )}

      <div className="cards">
        {loading
          ? skeletonItems.map((_, index) => (
              <div className="swiper-slide my-card card-1" key={`skeleton-${index}`}>
                <Skeleton width={100} height={100} />
                <div className="my-body">
                  <Skeleton height={20} count={3} />
                </div>
              </div>
            ))
          : fruits.map((product) => (
              <div className="swiper-slide my-card card-1" key={product.id}>
                <img
                  src={product.thumbnail_url}
                  width={100}
                  height={100}
                  alt={product.title}
                />

                <div className="my-body">
                  <h5>{product.title}</h5>

                  <div className="my-top">
                    <p className="fruit-price">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </p>
                    <span>Sold: {product.sold_count || 0}</span>
                  </div>

                  <div className="my-mid" />

                  <button className="my-btn-card">
                    <Link to="https://wa.me/6283103293225">
                      <h5>Contact !</h5>
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

CardFruit.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

CardFruit.defaultProps = {
  data: [],
  loading: false,
};

export default CardFruit;