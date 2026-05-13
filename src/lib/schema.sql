-- ============================================================
-- warespire E-Commerce PostgreSQL Schema
-- Replaces WooCommerce as the data source
-- All table names use the "warespire_" prefix (matches TABLE_PREFIX in .env)
-- ============================================================

-- Users / Customers
CREATE TABLE IF NOT EXISTS warespire_users (
  id               SERIAL PRIMARY KEY,
  first_name       VARCHAR(100) NOT NULL DEFAULT '',
  last_name        VARCHAR(100) NOT NULL DEFAULT '',
  username         VARCHAR(100) UNIQUE NOT NULL,
  email            VARCHAR(255) UNIQUE NOT NULL,
  password_hash    VARCHAR(255) NOT NULL,
  role             VARCHAR(50) NOT NULL DEFAULT 'customer',
  phone            VARCHAR(50),
  address          TEXT,
  city             VARCHAR(100),
  state            VARCHAR(100),
  country          VARCHAR(100),
  postcode         VARCHAR(20),
  avatar_url       TEXT,
  is_verified      BOOLEAN NOT NULL DEFAULT false,
  verification_token    VARCHAR(255),
  reset_token           VARCHAR(255),
  reset_token_expires   TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Categories
CREATE TABLE IF NOT EXISTS warespire_categories (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id   INTEGER REFERENCES warespire_categories(id) ON DELETE SET NULL,
  image_url   TEXT,
  count       INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS warespire_products (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(500) NOT NULL,
  slug              VARCHAR(500) UNIQUE NOT NULL,
  sku               VARCHAR(255),
  description       TEXT,
  short_description TEXT,
  price             DECIMAL(14,2) NOT NULL DEFAULT 0,
  regular_price     DECIMAL(14,2),
  sale_price        DECIMAL(14,2),
  stock_status      VARCHAR(50) NOT NULL DEFAULT 'instock',
  stock_quantity    INTEGER NOT NULL DEFAULT 0,
  rating_count      INTEGER NOT NULL DEFAULT 0,
  average_rating    DECIMAL(3,2) NOT NULL DEFAULT 0,
  status            VARCHAR(50) NOT NULL DEFAULT 'publish',
  type              VARCHAR(50) NOT NULL DEFAULT 'simple',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Images
CREATE TABLE IF NOT EXISTS warespire_product_images (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES warespire_products(id) ON DELETE CASCADE,
  src         TEXT NOT NULL,
  name        VARCHAR(255),
  alt         TEXT,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product ↔ Category (many-to-many)
CREATE TABLE IF NOT EXISTS warespire_product_categories (
  product_id   INTEGER NOT NULL REFERENCES warespire_products(id) ON DELETE CASCADE,
  category_id  INTEGER NOT NULL REFERENCES warespire_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Product Attributes (e.g. Color, Size, Brand)
CREATE TABLE IF NOT EXISTS warespire_product_attributes (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES warespire_products(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  options     TEXT[] NOT NULL DEFAULT '{}',
  position    INTEGER NOT NULL DEFAULT 0
);

-- Orders
CREATE TABLE IF NOT EXISTS warespire_orders (
  id                    SERIAL PRIMARY KEY,
  customer_id           INTEGER REFERENCES warespire_users(id) ON DELETE SET NULL,
  status                VARCHAR(50) NOT NULL DEFAULT 'pending',
  currency              VARCHAR(10) NOT NULL DEFAULT 'NGN',
  total                 DECIMAL(14,2) NOT NULL DEFAULT 0,
  subtotal              DECIMAL(14,2) NOT NULL DEFAULT 0,
  discount              DECIMAL(14,2) NOT NULL DEFAULT 0,
  shipping_cost         DECIMAL(14,2) NOT NULL DEFAULT 0,
  payment_method        VARCHAR(100),
  payment_method_title  VARCHAR(255),
  transaction_id        VARCHAR(255),
  shipping_option       VARCHAR(100),
  -- Billing / shipping info stored as JSON for flexibility
  billing               JSONB NOT NULL DEFAULT '{}',
  order_notes           TEXT,
  receipt_url           TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Line Items
CREATE TABLE IF NOT EXISTS warespire_order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER NOT NULL REFERENCES warespire_orders(id) ON DELETE CASCADE,
  product_id  INTEGER REFERENCES warespire_products(id) ON DELETE SET NULL,
  name        VARCHAR(500) NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1,
  price       DECIMAL(14,2) NOT NULL,
  total       DECIMAL(14,2) NOT NULL,
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Paylater Requests
CREATE TABLE IF NOT EXISTS warespire_paylater_requests (
  id          SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES warespire_users(id) ON DELETE CASCADE,
  product_id  INTEGER REFERENCES warespire_products(id) ON DELETE SET NULL,
  status      VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment     JSONB NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hero / Promotional Banners
CREATE TABLE IF NOT EXISTS warespire_banners (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255),
  image_url   TEXT NOT NULL,
  url         TEXT,
  show        BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Global Store Settings (key-value)
CREATE TABLE IF NOT EXISTS warespire_global_settings (
  id          SERIAL PRIMARY KEY,
  key         VARCHAR(255) UNIQUE NOT NULL,
  value       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Reviews
CREATE TABLE IF NOT EXISTS warespire_reviews (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES warespire_products(id) ON DELETE CASCADE,
  reviewer    VARCHAR(255) NOT NULL,
  email       VARCHAR(255),
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT NOT NULL,
  verified    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_warespire_products_status        ON warespire_products(status);
CREATE INDEX IF NOT EXISTS idx_warespire_products_stock_status  ON warespire_products(stock_status);
CREATE INDEX IF NOT EXISTS idx_warespire_product_images_product ON warespire_product_images(product_id, position);
CREATE INDEX IF NOT EXISTS idx_warespire_product_cat_product    ON warespire_product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_warespire_product_cat_category   ON warespire_product_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_warespire_orders_customer        ON warespire_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_warespire_orders_status          ON warespire_orders(status);
CREATE INDEX IF NOT EXISTS idx_warespire_order_items_order      ON warespire_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_warespire_categories_parent      ON warespire_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_warespire_categories_slug        ON warespire_categories(slug);
CREATE INDEX IF NOT EXISTS idx_warespire_reviews_product        ON warespire_reviews(product_id);

-- ── Default Global Settings ───────────────────────────────────
INSERT INTO warespire_global_settings (key, value) VALUES
  ('shop_name',           'warespire'),
  ('company_name',        'warespire Technologies Limited'),
  ('address',             'Nigeria'),
  ('email',               'support@warespire.com'),
  ('contact',             ''),
  ('website',             'https://warespire.com'),
  ('default_currency',    'NGN'),
  ('default_time_zone',   'Africa/Lagos'),
  ('default_date_format', 'DD-MM-YYYY'),
  ('vat_number',          ''),
  ('post_code',           ''),
  ('receipt_size',        'A4'),
  ('percentage',          '0'),
  ('number_of_image_per_product', '5')
ON CONFLICT (key) DO NOTHING;
