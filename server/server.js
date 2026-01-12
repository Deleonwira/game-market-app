const express = require('express');
const cors = require('cors');
const db = require('./db_connection');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * GET /api/products
 * Query params:
 * - game: filter by game slug (e.g., 'blox-fruit')
 * - status: filter by status ('available', 'sold', etc.)
 * - type: filter by product type based on attributes
 */
app.get('/api/products', (req, res) => {
    const { game, status, type } = req.query;

    let query = `
        SELECT 
            p.id,
            p.title,
            p.description,
            p.price,
            p.original_price,
            p.thumbnail_url,
            p.stock,
            p.sold_count,
            p.status,
            p.is_featured,
            p.created_at,
            g.name AS game_name,
            g.slug AS game_slug
        FROM products p
        JOIN games g ON p.game_id = g.id
        WHERE 1=1
    `;

    const params = [];

    if (game) {
        query += ' AND g.slug = ?';
        params.push(game);
    }

    if (status) {
        query += ' AND p.status = ?';
        params.push(status);
    }

    query += ' ORDER BY p.is_featured DESC, p.created_at DESC';

    db.query(query, params, (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Fetch attributes for each product
        if (products.length === 0) {
            return res.json([]);
        }

        const productIds = products.map(p => p.id);
        const attrQuery = `
            SELECT product_id, attribute_name, attribute_value 
            FROM product_attributes 
            WHERE product_id IN (?)
            ORDER BY display_order
        `;

        db.query(attrQuery, [productIds], (err, attributes) => {
            if (err) {
                console.error('Error fetching attributes:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Group attributes by product_id
            const attrMap = {};
            attributes.forEach(attr => {
                if (!attrMap[attr.product_id]) {
                    attrMap[attr.product_id] = {};
                }
                attrMap[attr.product_id][attr.attribute_name] = attr.attribute_value;
            });

            // Merge attributes into products
            const result = products.map(product => ({
                ...product,
                attributes: attrMap[product.id] || {}
            }));

            res.json(result);
        });
    });
});

/**
 * GET /api/products/:id
 * Get single product with all attributes
 */
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT 
            p.*,
            g.name AS game_name,
            g.slug AS game_slug
        FROM products p
        JOIN games g ON p.game_id = g.id
        WHERE p.id = ?
    `;

    db.query(query, [id], (err, products) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = products[0];

        // Fetch attributes
        const attrQuery = `
            SELECT attribute_name, attribute_value, display_order
            FROM product_attributes 
            WHERE product_id = ?
            ORDER BY display_order
        `;

        db.query(attrQuery, [id], (err, attributes) => {
            if (err) {
                console.error('Error fetching attributes:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            const attrObj = {};
            attributes.forEach(attr => {
                attrObj[attr.attribute_name] = attr.attribute_value;
            });

            res.json({
                ...product,
                attributes: attrObj
            });
        });
    });
});

/**
 * GET /api/games
 * Get all active games
 */
app.get('/api/games', (req, res) => {
    db.query('SELECT * FROM games WHERE is_active = TRUE', (err, result) => {
        if (err) {
            console.error('Error fetching games:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result);
    });
});

// Legacy endpoint for backward compatibility
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.json(result);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
