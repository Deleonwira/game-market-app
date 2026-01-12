import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { formatCurrency } from '../../utils';

/**
 * Komponen untuk menampilkan template card produk
 */
const CardTemplate = ({ product, loading, voucher }) => {
  const discountedPrice = voucher 
    ? product.price - (product.price * 0.05) 
    : product.price;

  return (
    <div className="swiper-slide my-card">
      {loading ? (
        <Skeleton width={132} height={90} borderRadius={10} />
      ) : (
        <img src={product.thumbnail_url} width="220" alt={product.title} />
      )}

      {loading ? (
        <Skeleton borderRadius={5} height={20} count={3} />
      ) : (
        <div className="my-body">
          <div className="my-top">
            <p>{formatCurrency(discountedPrice)}</p>
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
      )}
    </div>
  );
};

CardTemplate.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  voucher: PropTypes.bool,
};

CardTemplate.defaultProps = {
  loading: false,
  voucher: false,
};

/**
 * Komponen CardAkun - Menampilkan daftar akun dengan kategori Termurah dan Sultan
 * @param {Array} data - Array of products from API
 * @param {boolean} loading - Loading state
 * @param {boolean} voucher - Voucher aktif
 */
const CardAkun = ({ data, loading, voucher }) => {
  // Filter products by price categories
  const cheapAccounts = data.filter((item) => Number(item.price) <= 99000);
  const premiumAccounts = data.filter((item) => Number(item.price) > 100000);

  // Show skeleton placeholders when loading
  const skeletonItems = Array(3).fill({});

  return (
    <section className="produk-unggulan">
      {/* Kategori Akun Termurah */}
      <div className="akun-murah col">
        {loading ? (
          <Skeleton width={100} height={28} />
        ) : (
          <h3>Termurah</h3>
        )}

        <div className="cards">
          {loading
            ? skeletonItems.map((_, index) => (
                <CardTemplate
                  key={`skeleton-cheap-${index}`}
                  product={{ id: index, title: '', price: 0 }}
                  loading={true}
                  voucher={voucher}
                />
              ))
            : cheapAccounts.map((product) => (
                <CardTemplate
                  key={product.id}
                  product={product}
                  loading={false}
                  voucher={voucher}
                />
              ))}
        </div>
      </div>

      {/* Kategori Akun Sultan */}
      <div className="akun-sultan col">
        {loading ? (
          <Skeleton width={100} height={28} />
        ) : (
          <h3>Akun Sultan</h3>
        )}

        <div className="cards">
          {loading
            ? skeletonItems.map((_, index) => (
                <CardTemplate
                  key={`skeleton-sultan-${index}`}
                  product={{ id: index, title: '', price: 0 }}
                  loading={true}
                  voucher={voucher}
                />
              ))
            : premiumAccounts.map((product) => (
                <CardTemplate
                  key={product.id}
                  product={product}
                  loading={false}
                  voucher={voucher}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

CardAkun.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  voucher: PropTypes.bool,
};

CardAkun.defaultProps = {
  data: [],
  loading: false,
  voucher: false,
};

export default CardAkun;
