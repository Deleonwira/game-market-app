import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CardAkun from './CardAkun';
import CardFruit from './CardFruit';
import CardSold from './CardSold';
import { getProducts } from '../../services/productService';

/**
 * Komponen CardCategory - Wrapper untuk menampilkan card berdasarkan kategori
 * Fetches data dari API dan handles loading state
 */
const CardCategory = ({ title, voucher }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let params = { game: 'blox-fruit' };

        // Add status filter for sold category
        if (title?.toLowerCase() === 'sold') {
          params.status = 'sold';
        } else {
          params.status = 'available';
        }

        const products = await getProducts(params);
        setData(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  // Render komponen berdasarkan kategori
  const renderCategory = () => {
    switch (title?.toLowerCase()) {
      case 'akun':
        return <CardAkun data={data} loading={loading} voucher={voucher} />;
      case 'fruit':
        return <CardFruit data={data} loading={loading} />;
      case 'sold':
        return <CardSold data={data} loading={loading} />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <section className="produk-unggulan">
        <p className="error-message">Error: {error}</p>
      </section>
    );
  }

  return renderCategory();
};

CardCategory.propTypes = {
  title: PropTypes.oneOf(['akun', 'fruit', 'sold', 'Akun', 'Fruit', 'Sold']).isRequired,
  voucher: PropTypes.bool,
};

CardCategory.defaultProps = {
  voucher: false,
};

export default CardCategory;