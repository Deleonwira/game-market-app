# 🎮 CatMid - Game Marketplace

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479a1?logo=mysql)](https://mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)

Marketplace untuk jual beli akun dan items game Roblox (Blox Fruit). Dibangun dengan React + Vite (Frontend) dan Express.js + MySQL (Backend).

---

## 📁 Struktur Folder

```
game-market-app/
├── client/                      # Frontend React + Vite
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── assets/
│   │   │   ├── data/            # JSON data files (legacy)
│   │   │   ├── icons/           # Icon components
│   │   │   └── images/          # Image assets
│   │   ├── components/
│   │   │   ├── Card/            # Product cards (CardAkun, CardFruit, CardSold)
│   │   │   ├── DisplayDagangan/ # Product detail display
│   │   │   ├── Footer/          # Footer component
│   │   │   ├── Header/          # Header/Hero section
│   │   │   ├── Navbar/          # Navigation bar
│   │   │   ├── ProdukUnggulan/  # Featured products
│   │   │   ├── Qna/             # FAQ section
│   │   │   ├── Sold/            # Sold products section
│   │   │   ├── Testimonials/    # Customer testimonials
│   │   │   └── Voucher/         # Voucher input component
│   │   ├── constants/           # App constants & config
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Main product listing
│   │   │   ├── SplashPage.jsx   # Landing page
│   │   │   ├── ProductDetailPage.jsx # Product details
│   │   │   └── PaymentPage.jsx  # Payment page (incomplete)
│   │   ├── services/            # API service layer
│   │   │   ├── index.js         # Base URL config
│   │   │   └── productService.js # Product API calls
│   │   ├── styles/              # SCSS stylesheets
│   │   │   ├── _*Styles/        # Component-specific styles
│   │   │   ├── global/          # Global styles & variables
│   │   │   └── main.scss        # Entry point
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Main app with routing
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend Express.js
│   ├── server.js                # API endpoints
│   ├── db_connection.js         # MySQL connection
│   └── package.json
│
└── database/
    └── game_marketplace.sql     # Database schema & sample data
```

---

## 🔧 Teknologi Yang Digunakan

### Frontend
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| React | 19.2.0 | UI Library |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.12.0 | Client-side routing |
| SCSS | 1.97.2 | CSS preprocessor |
| react-loading-skeleton | 3.5.0 | Loading states |
| react-helmet | 6.1.0 | SEO/Meta tags |
| jQuery | 3.7.1 | ⚠️ DOM manipulation |

### Backend
| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| Express | 5.2.1 | Web framework |
| MySQL | 2.18.1 | Database driver |
| CORS | 2.8.5 | Cross-origin requests |
| Nodemon | 3.1.11 | Dev server |

---

## 🚨 ANALISIS MASALAH & REKOMENDASI PERBAIKAN

### 🔴 Masalah Kritis (Critical Issues)

#### 1. **jQuery Mixed dengan React**
**File:** `HomePage.jsx`, `ProductDetailPage.jsx`
```javascript
// ❌ Masalah: Menggunakan jQuery di React
import $ from 'jquery';
const voucherCode = $('.val-voucher').val();
```
**Dampak:** Melanggar React paradigm, menyebabkan bugs sulit di-debug, memory leak.

**✅ Solusi:**
```javascript
// Gunakan useRef atau controlled input
const voucherRef = useRef();
// atau
const [voucherCode, setVoucherCode] = useState('');
```

---

#### 2. **Hardcoded Voucher Codes**
**File:** `HomePage.jsx`, `ProductDetailPage.jsx`
```javascript
// ❌ Masalah: Voucher code di frontend
if (voucherCode === 'CATMIDKECEasdasiud') // TERLIHAT DI BROWSER!
```
**Dampak:** Security issue - user bisa lihat source code.

**✅ Solusi:**
- Pindahkan validasi voucher ke backend API
- Buat endpoint `POST /api/vouchers/validate`
- Simpan voucher codes di database

---

#### 3. **Database Name Mismatch**
**File:** `db_connection.js` vs `game_marketplace.sql`
```javascript
// db_connection.js - ❌ Salah
database: "catmid_app"

// game_marketplace.sql - ✅ Seharusnya
// Database name: game_marketplace
```
**Dampak:** Koneksi database gagal jika tidak cocok.

---

#### 4. **Incomplete ProductDetailPage - Masih Pakai Static JSON**
**File:** `ProductDetailPage.jsx`
```javascript
// ❌ Masalah: Import static data, bukan API
import dataAkun from "../assets/data/dataAkun";
const akunTunggal = dataAkun.find(...);
```
**Dampak:** Data tidak sinkron dengan database.

**✅ Solusi:**
```javascript
// Gunakan API service
const [product, setProduct] = useState(null);
useEffect(() => {
  getProductById(productId).then(setProduct);
}, [productId]);
```

---

### 🟠 Masalah Sedang (Medium Issues)

#### 5. **Tidak Ada Authentication System**
**Dampak:** Tidak bisa track user, tidak bisa proteksi admin routes.

**✅ Rekomendasi:**
- Implementasi JWT authentication
- Buat `authService.js` dan `AuthContext`
- Protect admin endpoints di backend

---

#### 6. **Tidak Ada Error Boundaries**
**Dampak:** App crash total jika ada error di satu komponen.

**✅ Solusi:**
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

---

#### 7. **PaymentPage Belum Diimplementasi**
**File:** `PaymentPage.jsx`
```jsx
// ❌ Masalah: Page tidak functional
return <h1>JAMAL {akunTunggal.cardId}</h1>
```

---

#### 8. **Duplikasi Logic Voucher**
**File:** `HomePage.jsx`, `ProductDetailPage.jsx`
- Fungsi `handleVoucher()` ada di 2 tempat dengan kode berbeda.

**✅ Solusi:**
- Buat custom hook `useVoucher()`
- Atau gunakan Context API untuk state voucher

---

#### 9. **Callback-Based MySQL Queries**
**File:** `server.js`
```javascript
// ❌ Callback hell, sulit maintain
db.query(query, params, (err, products) => {
  db.query(attrQuery, [productIds], (err, attributes) => {
    // Nested callbacks...
  });
});
```

**✅ Solusi:** Gunakan mysql2 dengan promises
```javascript
import mysql from 'mysql2/promise';
const [rows] = await pool.execute(query, params);
```

---

### 🟡 Masalah Minor (Code Quality)

#### 10. **Inconsistent Naming**
- `FaebookIcon` → seharusnya `FacebookIcon`
- File `.scss` terpisah di folder berbeda dari komponen
- Mix bahasa (Indonesia + English) dalam komentar

#### 11. **Hardcoded WhatsApp Number**
```jsx
<Link to="https://wa.me/6283103293225">
```
**✅ Pindahkan ke constants atau environment variable**

#### 12. **window.scrollTo di render**
```jsx
// ❌ Side effect di luar useEffect
window.scrollTo(0,0);
```
**✅ Pindahkan ke useEffect**

---

## 📋 PRIORITAS PERBAIKAN

| Prioritas | Masalah | Effort | Impact |
|-----------|---------|--------|--------|
| 🔴 P1 | Hapus jQuery, ganti dengan React Refs | Medium | High |
| 🔴 P1 | Fix database name mismatch | Low | High |
| 🔴 P1 | Migrasikan voucher validation ke backend | Medium | High |
| 🟠 P2 | Update ProductDetailPage pakai API | Low | High |
| 🟠 P2 | Implementasi PaymentPage | High | Medium |
| 🟠 P2 | Ganti mysql ke mysql2/promise | Medium | Medium |
| 🟠 P2 | Tambah Authentication | High | High |
| 🟡 P3 | Error Boundaries | Low | Medium |
| 🟡 P3 | Refactor duplikasi voucher logic | Low | Low |
| 🟡 P3 | Fix typos & naming consistency | Low | Low |

---

## 🏗️ ARSITEKTUR YANG DIREKOMENDASIKAN

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                      App.jsx                             ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              ││
│  │  │ AuthCtx  │  │ CartCtx  │  │VoucherCtx│              ││
│  │  └──────────┘  └──────────┘  └──────────┘              ││
│  │       │              │             │                    ││
│  │  ┌────────────────────────────────────────┐            ││
│  │  │           Pages (Container)             │            ││
│  │  │  ┌──────────────────────────────────┐  │            ││
│  │  │  │     Components (Presentational)  │  │            ││
│  │  │  └──────────────────────────────────┘  │            ││
│  │  └────────────────────────────────────────┘            ││
│  │                     │                                   ││
│  │  ┌─────────────────────────────────────────┐           ││
│  │  │       Services (API Layer)              │           ││
│  │  │  authService │ productService │ orderService       ││
│  │  └─────────────────────────────────────────┘           ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                       SERVER (Express)                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     Routes Layer                         ││
│  │  /api/auth   /api/products   /api/orders   /api/vouchers││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  Controllers Layer                       ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Services Layer                        ││
│  └─────────────────────────────────────────────────────────┘│
│                              │                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │            Database Layer (mysql2/promise)              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │     MySQL       │
                    │ game_marketplace│
                    └─────────────────┘
```

---

## 🚀 Cara Menjalankan

### 1. Setup Database
```bash
# Import SQL ke MySQL
mysql -u root -p < database/game_marketplace.sql
```

### 2. Setup Server
```bash
cd server
npm install
# Edit db_connection.js sesuai konfigurasi MySQL anda
npm run dev
# Server berjalan di http://localhost:3000
```

### 3. Setup Client
```bash
cd client
npm install
npm run dev
# Client berjalan di http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/products` | List semua produk (filter: game, status, platform) |
| GET | `/api/products/:id` | Detail produk dengan atribut |
| GET | `/api/platforms` | List platform aktif |
| GET | `/api/games` | List games aktif |
| GET | `/products` | Legacy endpoint (deprecated) |

---

## 📊 Database Schema

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ platforms│────<│  games   │────<│ products │
└──────────┘     └──────────┘     └──────────┘
                                       │
                                       │
                              ┌────────┴────────┐
                              │                 │
                    ┌─────────────────┐  ┌──────┴─────┐
                    │product_attributes│  │order_items │
                    └─────────────────┘  └──────┬─────┘
                                                │
┌──────────┐                            ┌───────┴───────┐
│  users   │───────────────────────────>│    orders     │
└──────────┘                            └───────┬───────┘
                                                │
                                        ┌───────┴───────┐
                                        │   payments    │
                                        └───────────────┘
```

---

## ✅ TODO - Next Steps

- [ ] Migrate jQuery to React Refs
- [ ] Fix database connection name
- [ ] Implement voucher validation API
- [ ] Complete ProductDetailPage with API
- [ ] Implement PaymentPage
- [ ] Add authentication system
- [ ] Add error boundaries
- [ ] Migrate to mysql2/promise
- [ ] Add unit tests
- [ ] Setup CI/CD pipeline

---

## 📝 License

Private Project - CatMid Store

---

*Dokumentasi ini dibuat pada 15 Januari 2026*
