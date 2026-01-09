-- =====================================================
-- GAME MARKETPLACE DATABASE
-- Designed for multi-game marketplace (MVP-ready, scalable)
-- =====================================================

-- Drop tables if exist (for clean import)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_attributes;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

-- =====================================================
-- TABLE: users
-- Menyimpan akun pengguna dengan role admin/customer
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'customer') DEFAULT 'customer',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: games
-- Katalog jenis game yang tersedia di marketplace
-- =====================================================
CREATE TABLE games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(500),
    banner_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: products
-- Produk yang dijual (akun game, item, dll)
-- =====================================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    original_price DECIMAL(12, 2),
    thumbnail_url VARCHAR(500),
    stock INT DEFAULT 1,
    sold_count INT DEFAULT 0,
    status ENUM('available', 'sold', 'reserved', 'hidden') DEFAULT 'available',
    seller_notes TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLE: product_attributes
-- Atribut dinamis untuk tiap produk (key-value pairs)
-- Contoh: level, username, items, gamepass, dll
-- =====================================================
CREATE TABLE product_attributes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    attribute_name VARCHAR(100) NOT NULL,
    attribute_value TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Index untuk query cepat berdasarkan nama atribut
CREATE INDEX idx_attr_name ON product_attributes(attribute_name);

-- =====================================================
-- TABLE: orders
-- Pesanan pengguna
-- =====================================================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLE: order_items
-- Item dalam pesanan (relasi order-product)
-- =====================================================
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- =====================================================
-- TABLE: payments
-- Informasi pembayaran (terpisah untuk audit)
-- =====================================================
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method ENUM('transfer_bank', 'ewallet', 'qris', 'other') NOT NULL,
    payment_channel VARCHAR(50),
    amount DECIMAL(12, 2) NOT NULL,
    status ENUM('pending', 'paid', 'failed', 'expired', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(100),
    proof_url VARCHAR(500),
    paid_at TIMESTAMP NULL,
    expired_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert Admin & Sample Customer
INSERT INTO users (email, password, name, phone, role) VALUES
('admin@catmid.com', '$2y$10$hashedpassword123', 'Admin CatMid', '081234567890', 'admin'),
('customer@example.com', '$2y$10$hashedpassword456', 'John Doe', '081234567891', 'customer');

-- Insert Games
INSERT INTO games (name, slug, description, icon_url, is_active) VALUES
('Blox Fruits', 'blox-fruit', 'Roblox Blox Fruits game accounts and items', 'https://example.com/bloxfruit-icon.png', TRUE),
('Growtopia', 'growtopia', 'Growtopia game accounts and world locks', 'https://example.com/growtopia-icon.png', TRUE),
('Mobile Legends', 'mobile-legends', 'Mobile Legends Bang Bang accounts', 'https://example.com/mlbb-icon.png', TRUE);

-- Insert Sample Products (Blox Fruit Accounts)
INSERT INTO products (game_id, title, description, price, thumbnail_url, status, is_featured) VALUES
(1, 'V4 Shark All V3 + Sword Bejibun + PERM', 'Akun lengkap dengan V4 Shark, semua V3 race, dan PERM fruits', 135000.00, 'https://i.ibb.co/syKrpcY/thumbnail-akun-yllus.jpg', 'available', TRUE),
(1, 'V4 Ghoul + Awaken Ice Fruit + CDK SG', 'Akun dengan V4 Ghoul dan Awaken Ice Fruit', 59000.00, 'https://i.ibb.co/xfSrsRr/thumbnail-akun-than.jpg', 'available', FALSE),
(1, 'V3 + Shark Anchor with Sword Bejibun', 'Akun V3 dengan Shark Anchor dan banyak sword', 55000.00, 'https://i.ibb.co/z7pcqgq/thumbnail-akun-voph.jpg', 'available', FALSE),
(1, 'Polosan PERM Buddha, Trex, Kitsune', 'Akun polosan dengan PERM Buddha, Trex, dan Kitsune', 159000.00, 'https://i.ibb.co/tZmD81L/thumbnail-akun-ninja.jpg', 'available', TRUE),
(1, 'SPEK PVP 13M Bounty! + ALL V4', 'Akun PVP ready dengan 13M bounty dan semua V4', 99000.00, 'https://i.ibb.co/2hykLV3/thumbnail-akun-hoboji.jpg', 'available', FALSE);

-- Insert Product Attributes for Product 1 (V4 Shark Account)
INSERT INTO product_attributes (product_id, attribute_name, attribute_value, display_order) VALUES
-- Currency Info
(1, 'level', '2550 (Max)', 1),
(1, 'beli', '6,159,599', 2),
(1, 'fragment', '4,989', 3),
(1, 'gamepass', '2x Money, 2x Mastery', 4),
-- Items
(1, 'sword', 'G1 Cursed Dual Katana, Hallow Scythe, True Triple Katana, G1 Soul Guitar, G1 Rengoku, G1 Saber, G1 Wandaso, Buddy Sword, Canvander, Koko, Midnight Blade, Pole, Saddi, Shisui, Spikey Trident, Tushita, Yama, Bazooka, Kabucha, Serpent Bow', 5),
(1, 'accessory', 'Holiday Cloak, Kitsune Ribbon, Holy crown, Musketeer Hat Pale Scarf, Valkyrie Helm, Zebra cap, Terror jaw', 6),
(1, 'fruit', 'PERM(Rocket, Spin, Flame, Light, Buddha, Portal), Gravity', 7),
(1, 'fighting_style', 'GodHuman (All Skill), Kitsune(All skill, Full awaken), Cursed Dual Katana(All Skill), Soul Guitar(All Skill)', 8),
(1, 'race', 'V4 Shark, All V3 Rainbow Haki -013', 9),
(1, 'tambahan', 'Datpol no topi', 10);

-- Insert Product Attributes for Product 2 (V4 Ghoul Account)
INSERT INTO product_attributes (product_id, attribute_name, attribute_value, display_order) VALUES
(2, 'level', '2550 (Max)', 1),
(2, 'beli', '360,133', 2),
(2, 'fragment', '10,272', 3),
(2, 'gamepass', '-', 4),
(2, 'sword', 'G1 Crused Dual Katana, Soul Guitar, Buddy Sword, Saber, Spikey Trident, Tushita, Yama, Bazooka, Kabucha, Serpent Bow', 5),
(2, 'accessory', 'Holy crown, Musketeer Hat Pale Scarf, Valkyrie Helm, Zebra cap, Terror jaw', 6),
(2, 'fruit', 'Gravity Fruit, Portal Fruit, Love Fruit, Quake Fruit', 7),
(2, 'fighting_style', 'GodHuman (All Skill), Ice(All skill, Full awaken), Cursed Dual Katana(All Skill), Soul Guitar(All Skill)', 8),
(2, 'race', 'V4 Ghoul, Rainbow Haki -013', 9);

-- Insert Product Attributes for Product 3
INSERT INTO product_attributes (product_id, attribute_name, attribute_value, display_order) VALUES
(3, 'level', '2550 (Max)', 1),
(3, 'beli', '14,060,128', 2),
(3, 'fragment', '29,227', 3),
(3, 'gamepass', '-', 4),
(3, 'sword', 'G1 Hallow Scythe, Cursed Dual Katana, Shark Anchor, Soul Guitar, Buddy Sword, Koko, Midnight Blade, Pole, Rengoku, Saber, Saddi, Spikey Trident, Tushita, Yama, Kabucha, Serpent Bow', 5),
(3, 'accessory', 'Dark Coat, Holy crown, Kitsune Mask, Kitsune Ribbon, Musketeer Hat Pale Scarf, Valkyrie Helm, Zebra cap', 6),
(3, 'fruit', 'Venom Fruit, Shadow Fruit, Mammoth Fruit, Gravity Fruit', 7),
(3, 'fighting_style', 'GodHuman (All Skill), Magma(All skill Full awaken), Shark Anchor(All Skill)', 8),
(3, 'race', 'V3 Shark', 9);

-- Sample Order
INSERT INTO orders (user_id, order_number, total_amount, status) VALUES
(2, 'ORD-20260109-001', 135000.00, 'completed');

-- Sample Order Item
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 135000.00, 135000.00);

-- Sample Payment
INSERT INTO payments (order_id, payment_method, payment_channel, amount, status, paid_at) VALUES
(1, 'ewallet', 'DANA', 135000.00, 'paid', NOW());

-- =====================================================
-- USEFUL VIEWS
-- =====================================================

-- View: Products with game name and attribute count
CREATE OR REPLACE VIEW v_products_summary AS
SELECT 
    p.id,
    p.title,
    p.price,
    p.status,
    p.sold_count,
    g.name AS game_name,
    g.slug AS game_slug,
    (SELECT COUNT(*) FROM product_attributes WHERE product_id = p.id) AS attribute_count
FROM products p
JOIN games g ON p.game_id = g.id;

-- View: Order details with user info
CREATE OR REPLACE VIEW v_orders_detail AS
SELECT 
    o.id,
    o.order_number,
    o.total_amount,
    o.status AS order_status,
    u.name AS customer_name,
    u.email AS customer_email,
    p.status AS payment_status,
    p.payment_method,
    o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN payments p ON o.id = p.order_id;

-- =====================================================
-- END OF DATABASE SCHEMA
-- =====================================================
