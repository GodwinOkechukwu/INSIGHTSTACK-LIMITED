-- ============================================================
-- warespire Seed Data — Computers, Hardware & Accessories
-- Run via: GET /api/db/seed?secret=seed-db-2024
-- ============================================================

-- ── Categories ───────────────────────────────────────────────

-- 8 Main categories (no sub-categories)
INSERT INTO warespire_categories (name, slug, description, parent_id, image_url, count) VALUES
  ('Laptops & Notebooks',        'laptops-notebooks',        'Gaming laptops, business notebooks, ultrabooks and 2-in-1s', NULL, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 0),
  ('Desktop Computers',          'desktop-computers',        'Pre-built gaming PCs, workstations and mini desktops', NULL, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400', 0),
  ('Processors & Motherboards',  'processors-motherboards',  'CPUs from Intel and AMD, plus compatible motherboards', NULL, 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400', 0),
  ('Graphics Cards & Memory',    'graphics-cards-memory',    'GPUs, RAM modules and cooling solutions', NULL, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400', 0),
  ('Storage & Drives',           'storage-drives',           'SSDs, HDDs, NVMe drives and external storage', NULL, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', 0),
  ('Monitors & Displays',        'monitors-displays',        'Gaming monitors, professional displays and accessories', NULL, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 0),
  ('Keyboards & Mice',           'keyboards-mice',           'Mechanical keyboards, gaming mice and input devices', NULL, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 0),
  ('Networking & Accessories',   'networking-accessories',   'Routers, switches, cables, headsets and peripherals', NULL, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400', 0)
ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 1: LAPTOPS & NOTEBOOKS (12 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG Zephyrus G16 Gaming Laptop',
  'asus-rog-zephyrus-g16',
  'JOM-LAP-001',
  'Ultra-slim gaming laptop. Intel Core Ultra 9 185H, NVIDIA RTX 4070 8GB, 16" 2.5K OLED 240Hz, 32GB DDR5, 1TB SSD. ROG Nebula Display, MUX Switch, 90Wh battery.',
  'Slim OLED gaming laptop with RTX 4070',
  2150000, 2350000, 2150000, 'instock', 8, 42, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'MSI Titan 18 HX Gaming Laptop',
  'msi-titan-18-hx',
  'JOM-LAP-002',
  'Desktop replacement gaming beast. Intel Core i9-14900HX, NVIDIA RTX 4090 16GB, 18" UHD+ 120Hz Mini LED, 128GB DDR5, 4TB SSD. Mechanical keyboard, Cooler Boost 5.',
  '18" desktop replacement with RTX 4090',
  4250000, 4650000, 4250000, 'instock', 3, 28, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Lenovo Legion Pro 7i Gen 9',
  'lenovo-legion-pro-7i-gen9',
  'JOM-LAP-003',
  'Performance gaming laptop. Intel Core i9-14900HX, NVIDIA RTX 4080 12GB, 16" WQXGA 240Hz, 32GB DDR5, 1TB SSD. Legion Coldfront 5.0, TrueStrike keyboard.',
  'High-performance 16" with RTX 4080',
  2750000, 3000000, 2750000, 'instock', 6, 38, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Razer Blade 16 Gaming Laptop',
  'razer-blade-16',
  'JOM-LAP-004',
  'Premium gaming laptop. Intel Core i9-14900HX, NVIDIA RTX 4070 8GB, 16" QHD+ 240Hz, 32GB DDR5, 1TB SSD. CNC aluminum chassis, Vapor Chamber cooling.',
  'Premium 16" gaming laptop in aluminum',
  2450000, 2680000, 2450000, 'instock', 7, 45, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Dell XPS 15 9530 Creator Laptop',
  'dell-xps-15-9530',
  'JOM-LAP-005',
  'Creator-focused ultrabook. Intel Core i7-13700H, NVIDIA RTX 4060 8GB, 15.6" 3.5K OLED touchscreen, 32GB DDR5, 1TB SSD. Platinum finish, 86Wh battery.',
  'OLED creator laptop with RTX 4060',
  2050000, 2250000, 2050000, 'instock', 10, 52, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'HP Omen 16 Gaming Laptop',
  'hp-omen-16',
  'JOM-LAP-006',
  'Mid-range gaming laptop. Intel Core i7-13700HX, NVIDIA RTX 4060 8GB, 16.1" QHD 165Hz, 16GB DDR5, 512GB SSD. Omen Tempest Cooling, RGB keyboard.',
  'Affordable 16" gaming with RTX 4060',
  1350000, 1480000, 1350000, 'instock', 15, 68, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Lenovo ThinkPad P16s Gen 2 Workstation',
  'lenovo-thinkpad-p16s-gen2',
  'JOM-LAP-007',
  'Mobile workstation. Intel Core i7-1370P vPro, NVIDIA RTX A500 4GB, 16" WUXGA IPS, 32GB DDR5, 1TB SSD. ISV certified, MIL-STD-810H, ThinkShield.',
  'Professional workstation with vPro',
  1850000, 2050000, 1850000, 'instock', 8, 35, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS Vivobook Pro 16X OLED',
  'asus-vivobook-pro-16x-oled',
  'JOM-LAP-008',
  'Creator laptop. Intel Core i9-13980HX, NVIDIA RTX 4060 8GB, 16" 3.2K OLED 120Hz, 32GB DDR5, 1TB SSD. Dial Pad, Harman Kardon audio, WiFi 6E.',
  'OLED creator laptop with DialPad',
  1650000, 1820000, 1650000, 'instock', 12, 48, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Acer Swift X 14 Laptop',
  'acer-swift-x-14',
  'JOM-LAP-009',
  'Thin-and-light creator. Intel Core i7-1355U, NVIDIA RTX 4050 6GB, 14.5" 2.8K OLED, 16GB LPDDR5, 512GB SSD. 1.5kg, WiFi 6E, Thunderbolt 4.',
  'Portable 14" OLED with RTX 4050',
  1085000, 1200000, 1085000, 'instock', 18, 58, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'MacBook Pro 16" M3 Max',
  'macbook-pro-16-m3-max',
  'JOM-LAP-010',
  'Apple flagship laptop. M3 Max chip (16-core CPU, 40-core GPU), 16.2" Liquid Retina XDR, 48GB unified memory, 1TB SSD. 22-hour battery, Space Black.',
  'Ultimate MacBook with M3 Max chip',
  3850000, 4200000, 3850000, 'instock', 5, 32, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Microsoft Surface Laptop 5 15"',
  'microsoft-surface-laptop-5-15',
  'JOM-LAP-011',
  'Premium business laptop. Intel Core i7-1255U, Intel Iris Xe, 15" PixelSense touchscreen, 16GB LPDDR5x, 512GB SSD. Alcantara keyboard, Windows 11 Pro.',
  '15" premium touchscreen laptop',
  1485000, 1650000, 1485000, 'instock', 12, 42, 4.65, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'LG Gram 17 Ultra-Light Laptop',
  'lg-gram-17',
  'JOM-LAP-012',
  'Ultra-light 17" laptop. Intel Core i7-1360P, Intel Iris Xe, 17" WQXGA IPS, 16GB DDR5, 512GB SSD. Only 1.35kg, 80Wh battery, MIL-STD-810H.',
  '17" laptop at just 1.35kg weight',
  1285000, 1420000, 1285000, 'instock', 10, 38, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 2: DESKTOP COMPUTERS (9 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Alienware Aurora R16 Gaming Desktop',
  'alienware-aurora-r16',
  'JOM-DSK-001',
  'Premium gaming desktop. Intel Core i9-14900KF, NVIDIA RTX 4080 16GB, 32GB DDR5, 2TB NVMe SSD, liquid cooling, Legend 3 design, Windows 11 Home.',
  'Premium Alienware with RTX 4080',
  3450000, 3780000, 3450000, 'instock', 5, 38, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'NZXT Player: Three Prime Gaming PC',
  'nzxt-player-three-prime',
  'JOM-DSK-002',
  'High-end gaming PC. AMD Ryzen 9 7900X, NVIDIA RTX 4070 Ti 12GB, 32GB DDR5, 1TB NVMe, NZXT H7 Flow case, Kraken 360mm AIO, 850W Gold PSU.',
  'AMD gaming rig with RTX 4070 Ti',
  2650000, 2900000, 2650000, 'instock', 8, 48, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'CyberPowerPC Gamer Supreme Gaming Desktop',
  'cyberpower-gamer-supreme',
  'JOM-DSK-003',
  'Performance gaming PC. Intel Core i7-14700K, NVIDIA RTX 4060 Ti 16GB, 16GB DDR5, 1TB SSD, RGB case, 240mm AIO cooling, 750W Bronze PSU.',
  'Gaming PC with RTX 4060 Ti 16GB',
  1850000, 2050000, 1850000, 'instock', 12, 62, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'HP Z2 Tower G9 Workstation',
  'hp-z2-tower-g9',
  'JOM-DSK-004',
  'Professional workstation. Intel Xeon W-1370P, NVIDIA RTX A2000 12GB, 32GB DDR5 ECC, 1TB SSD, ISV certified, tool-less design, 3-year warranty.',
  'Entry workstation with RTX A2000',
  1485000, 1650000, 1485000, 'instock', 8, 32, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Dell OptiPlex 7010 Tower Desktop',
  'dell-optiplex-7010-tower',
  'JOM-DSK-005',
  'Business desktop. Intel Core i7-13700, 16GB DDR5, 512GB SSD, Intel UHD 770, WiFi 6E, Windows 11 Pro, TPM 2.0, 3-year ProSupport.',
  'Reliable business desktop with Win 11 Pro',
  850000, 950000, 850000, 'instock', 25, 58, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Apple Mac Studio M2 Ultra',
  'apple-mac-studio-m2-ultra',
  'JOM-DSK-006',
  'Apple desktop powerhouse. M2 Ultra chip (24-core CPU, 76-core GPU), 64GB unified memory, 1TB SSD, 8x Thunderbolt 4, WiFi 6E, macOS.',
  'Flagship Mac with M2 Ultra chip',
  3650000, 4000000, 3650000, 'instock', 4, 28, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Intel NUC 13 Extreme Gaming Mini PC',
  'intel-nuc-13-extreme',
  'JOM-DSK-007',
  'Compact gaming powerhouse. Intel Core i9-13900K, supports full-size GPU (up to RTX 4090), 64GB DDR5, 2TB SSD, 13L chassis, 750W PSU included.',
  'Mini PC supporting full-size RTX 4090',
  1485000, 1650000, 1485000, 'instock', 6, 42, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Minisforum Neptune HX100G Mini Gaming PC',
  'minisforum-neptune-hx100g',
  'JOM-DSK-008',
  'Compact gaming mini. AMD Ryzen 9 7945HX, AMD Radeon RX 7600M XT 8GB, 32GB DDR5, 1TB SSD, 2.5L chassis, WiFi 6E, dual 2.5Gb LAN.',
  'Tiny gaming PC with dedicated GPU',
  1185000, 1320000, 1185000, 'instock', 10, 38, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG NUC Extreme Gaming Desktop',
  'asus-rog-nuc-extreme',
  'JOM-DSK-009',
  'Premium mini gaming PC. Intel Core i9-13900K, NVIDIA RTX 4070 12GB (included), 32GB DDR5, 1TB SSD, 14L chassis, 750W PSU, Aura Sync RGB.',
  'ROG mini PC with RTX 4070 included',
  2250000, 2480000, 2250000, 'instock', 7, 32, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 3: PROCESSORS & MOTHERBOARDS (10 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Intel Core i9-14900K Processor',
  'intel-core-i9-14900k',
  'JOM-CPU-001',
  'Flagship unlocked CPU. 24 cores (8P+16E), 32 threads, up to 6.0GHz, 36MB cache, 125W base TDP, LGA1700, PCIe 5.0, DDR5-5600. Elite gaming and productivity.',
  '24-core flagship with 6.0GHz boost',
  485000, 540000, 485000, 'instock', 18, 68, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'AMD Ryzen 9 7950X3D Processor',
  'amd-ryzen-9-7950x3d',
  'JOM-CPU-002',
  'Gaming flagship with 3D V-Cache. 16 cores, 32 threads, up to 5.7GHz, 128MB L3 cache (3D V-Cache), 120W TDP, AM5, PCIe 5.0, DDR5. Best for gaming.',
  '16-core with 3D V-Cache for gaming',
  520000, 580000, 520000, 'instock', 12, 58, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Intel Core i7-14700K Processor',
  'intel-core-i7-14700k',
  'JOM-CPU-003',
  'High-performance unlocked. 20 cores (8P+12E), 28 threads, up to 5.6GHz, 33MB cache, 125W base, LGA1700. Great gaming and multitasking CPU.',
  '20-core with 5.6GHz boost',
  385000, 430000, 385000, 'instock', 30, 85, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'AMD Ryzen 7 7800X3D Processor',
  'amd-ryzen-7-7800x3d',
  'JOM-CPU-004',
  'Gaming optimized CPU. 8 cores, 16 threads, up to 5.0GHz, 96MB L3 cache (3D V-Cache), 120W TDP, AM5. Best gaming CPU for the money.',
  '8-core gaming king with 3D V-Cache',
  385000, 430000, 385000, 'instock', 25, 95, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Intel Core i5-14600K Processor',
  'intel-core-i5-14600k',
  'JOM-CPU-005',
  'Mid-range unlocked. 14 cores (6P+8E), 20 threads, up to 5.3GHz, 24MB cache, LGA1700. Best value gaming CPU from Intel.',
  '14-core value gaming CPU',
  268000, 300000, 268000, 'instock', 45, 102, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG Maximus Z790 Hero Motherboard',
  'asus-rog-maximus-z790-hero',
  'JOM-MB-001',
  'Premium Z790 ATX board. LGA1700, PCIe 5.0 x16 + dual M.2, DDR5-7800+ OC, WiFi 6E, 2.5Gb LAN, 20+1 power stages, Aura Sync RGB, AI Overclocking.',
  'Flagship Z790 with WiFi 6E',
  485000, 540000, 485000, 'instock', 12, 52, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'MSI MPG B760 Gaming Edge WiFi',
  'msi-mpg-b760-gaming-edge-wifi',
  'JOM-MB-002',
  'Mid-range B760 ATX. LGA1700, PCIe 5.0 M.2, DDR5-6800+ OC, WiFi 6E, 2.5Gb LAN, 14+1+1 VRM, Mystic Light RGB. Great value for i5/i7.',
  'Value B760 with WiFi 6E',
  185000, 210000, 185000, 'instock', 28, 72, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG Strix X670E-E Gaming WiFi',
  'asus-rog-strix-x670e-e',
  'JOM-MB-003',
  'Premium AM5 board. X670E, PCIe 5.0 x16 + dual M.2, DDR5-6400+ OC, WiFi 6E, 2.5Gb LAN, 18+2 power stages, Aura Sync RGB, AI Suite.',
  'High-end X670E for Ryzen 9000/7000',
  520000, 580000, 520000, 'instock', 10, 48, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Gigabyte B650 AORUS Elite AX V2',
  'gigabyte-b650-aorus-elite-ax-v2',
  'JOM-MB-004',
  'Value AM5 board. B650, PCIe 4.0, DDR5-6400+ OC, WiFi 6E, 2.5Gb LAN, 12+2+1 VRM, RGB Fusion. Perfect for Ryzen 7 7800X3D.',
  'Budget-friendly B650 with WiFi 6E',
  168000, 188000, 168000, 'instock', 35, 88, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASRock Z790 PG Lightning Motherboard',
  'asrock-z790-pg-lightning',
  'JOM-MB-005',
  'Budget Z790 ATX. LGA1700, PCIe 5.0 M.2, DDR5-6800+ OC, 2.5Gb LAN, 14+1+1 power stages, Polychrome RGB. Best budget Z790.',
  'Budget Z790 with solid features',
  148000, 168000, 148000, 'instock', 40, 95, 4.65, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 4: GRAPHICS CARDS & MEMORY (11 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG Strix GeForce RTX 4090 OC',
  'asus-rog-strix-rtx-4090-oc',
  'JOM-GPU-001',
  'Ultimate gaming GPU. 24GB GDDR6X, 16384 CUDA cores, 2640MHz boost, DLSS 3.5. Axial-tech fans, 3.5-slot cooler, dual BIOS, Aura Sync RGB.',
  'Flagship RTX 4090 with premium cooling',
  2150000, 2350000, 2150000, 'instock', 4, 38, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'MSI GeForce RTX 4080 SUPER Gaming X Trio',
  'msi-rtx-4080-super-gaming-x-trio',
  'JOM-GPU-002',
  'High-end RTX 4080 SUPER. 16GB GDDR6X, 10240 CUDA cores, 2595MHz boost, DLSS 3.5. Tri Frozr 3S cooling, Torx 5.0 fans, ARGB Mystic Light.',
  'RTX 4080 SUPER with Tri Frozr cooling',
  1250000, 1380000, 1250000, 'instock', 8, 48, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Gigabyte GeForce RTX 4070 Ti SUPER Eagle OC',
  'gigabyte-rtx-4070-ti-super-eagle',
  'JOM-GPU-003',
  '1440p/4K gaming GPU. 16GB GDDR6X, 8448 CUDA cores, 2610MHz boost, DLSS 3.5. Windforce 3X cooling, RGB Fusion, dual BIOS, metal backplate.',
  'RTX 4070 Ti SUPER with 16GB VRAM',
  920000, 1020000, 920000, 'instock', 12, 58, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'AMD Radeon RX 7900 XTX 24GB (Sapphire Nitro+)',
  'amd-rx-7900-xtx-sapphire-nitro',
  'JOM-GPU-004',
  'AMD flagship GPU. 24GB GDDR6, 6144 Stream processors, 2565MHz boost, RDNA 3, FSR 3, ray tracing. Tri-X cooling, TriXX software, vapor chamber.',
  'AMD flagship with 24GB VRAM',
  950000, 1050000, 950000, 'instock', 10, 52, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS Dual GeForce RTX 4070 OC Edition',
  'asus-dual-rtx-4070-oc',
  'JOM-GPU-005',
  '1440p gaming GPU. 12GB GDDR6X, 5888 CUDA cores, 2565MHz boost, DLSS 3.5. Axial-tech fans, 2.5-slot design, Aura Sync RGB.',
  'RTX 4070 for 1440p gaming',
  620000, 690000, 620000, 'instock', 18, 72, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'G.Skill Trident Z5 RGB 64GB DDR5-6400 CL32',
  'gskill-trident-z5-64gb-6400',
  'JOM-RAM-001',
  'High-performance DDR5. 64GB kit (2x32GB), 6400MHz, CL32-39-39-102, 1.4V, hand-screened ICs, Intel XMP 3.0, AMD EXPO, RGB lighting.',
  'Premium 64GB DDR5-6400 RGB kit',
  338000, 380000, 338000, 'instock', 20, 48, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Corsair Vengeance 32GB DDR5-6000 CL30',
  'corsair-vengeance-32gb-6000',
  'JOM-RAM-002',
  'Performance DDR5. 32GB kit (2x16GB), 6000MHz, CL30-36-36-76, 1.35V, Intel XMP 3.0, AMD EXPO, aluminum heatspreader. Great value.',
  'Value 32GB DDR5-6000 kit',
  148000, 168000, 148000, 'instock', 50, 88, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Kingston FURY Beast 32GB DDR5-5600 CL36',
  'kingston-fury-beast-32gb-5600',
  'JOM-RAM-003',
  'Budget DDR5. 32GB kit (2x16GB), 5600MHz, CL36-36-36, 1.25V, Intel XMP 3.0, AMD EXPO, low-profile heatspreader. Best budget DDR5.',
  'Budget 32GB DDR5-5600 kit',
  118000, 135000, 118000, 'instock', 65, 102, 4.65, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Noctua NH-D15 chromax.black CPU Cooler',
  'noctua-nh-d15-chromax-black',
  'JOM-COOL-001',
  'Premium air cooler. Dual-tower, 6 heatpipes, 2x NF-A15 PWM fans, 250W+ TDP, LGA1700/AM5 compatible. Ultra-quiet 24.6 dBA, all-black.',
  'Premium silent dual-tower cooler',
  128000, 145000, 128000, 'instock', 25, 78, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Corsair iCUE H150i Elite Capellix XT AIO',
  'corsair-icue-h150i-elite-capellix-xt',
  'JOM-COOL-002',
  'Premium 360mm AIO. RGB pump head, 3x ML RGB Elite fans, iCUE software, Zero RPM mode, 280W+ TDP. Commander CORE XT included.',
  '360mm RGB AIO with iCUE control',
  248000, 280000, 248000, 'instock', 20, 62, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Arctic Liquid Freezer III 280mm AIO',
  'arctic-liquid-freezer-iii-280',
  'JOM-COOL-003',
  'Value 280mm AIO. VRM fan on pump, 2x 140mm P14 PWM fans, 300W+ TDP, 8-year warranty. Best price-to-performance AIO.',
  'Budget 280mm AIO with VRM fan',
  138000, 155000, 138000, 'instock', 35, 95, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 5: STORAGE & DRIVES (10 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Samsung 990 PRO 2TB NVMe PCIe 4.0 SSD',
  'samsung-990-pro-2tb',
  'JOM-SSD-001',
  'Flagship Gen4 SSD. 2TB, 7450MB/s read, 6900MB/s write, Samsung V-NAND, DRAM cache, heatsink included, 1200 TBW, Magician software.',
  'Fastest PCIe 4.0 SSD - 7450MB/s',
  218000, 245000, 218000, 'instock', 35, 78, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'WD Black SN850X 2TB NVMe PCIe 4.0 SSD',
  'wd-black-sn850x-2tb',
  'JOM-SSD-002',
  'Gaming NVMe SSD. 2TB, 7300MB/s read, 6600MB/s write, Game Mode 2.0, heatsink version, WD Dashboard. Great for PS5 expansion.',
  'Gaming SSD with 7300MB/s speed',
  198000, 220000, 198000, 'instock', 40, 85, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Crucial T700 2TB PCIe 5.0 NVMe SSD',
  'crucial-t700-2tb',
  'JOM-SSD-003',
  'Next-gen PCIe 5.0 SSD. 2TB, 12400MB/s read, 11800MB/s write, Micron 232-layer NAND, DRAM cache, heatsink included. DirectStorage ready.',
  'PCIe 5.0 SSD with 12400MB/s speed',
  385000, 430000, 385000, 'instock', 15, 42, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Kingston KC3000 1TB PCIe 4.0 NVMe SSD',
  'kingston-kc3000-1tb',
  'JOM-SSD-004',
  'Value Gen4 SSD. 1TB, 7000MB/s read, 6000MB/s write, Phison E18 controller, 3D TLC NAND, graphene heatspreader. Great value.',
  'Budget Gen4 NVMe - 7000MB/s',
  98000, 115000, 98000, 'instock', 55, 102, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Crucial P3 Plus 4TB PCIe 4.0 NVMe SSD',
  'crucial-p3-plus-4tb',
  'JOM-SSD-005',
  'High-capacity Gen4. 4TB, 5000MB/s read, 4200MB/s write, QLC NAND, DRAM-less, HMB support. Best value for large storage.',
  'Large 4TB Gen4 SSD - great value',
  298000, 335000, 298000, 'instock', 30, 68, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Samsung 870 EVO 2TB 2.5" SATA SSD',
  'samsung-870-evo-2tb',
  'JOM-SSD-006',
  'Premium SATA SSD. 2TB, 560MB/s read, 530MB/s write, Samsung V-NAND, DRAM cache, 1200 TBW. Best SATA SSD available.',
  'Top SATA SSD with 2TB capacity',
  168000, 188000, 168000, 'instock', 45, 95, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Samsung T7 Shield 2TB Portable SSD',
  'samsung-t7-shield-2tb',
  'JOM-EXT-001',
  'Rugged portable SSD. 2TB, 1050MB/s read/write, USB 3.2 Gen 2, IP65 water/dust resistant, 3m drop resistant, rubber exterior.',
  'Rugged 2TB portable with IP65 rating',
  198000, 220000, 198000, 'instock', 35, 72, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'SanDisk Extreme PRO Portable SSD 4TB',
  'sandisk-extreme-pro-portable-4tb',
  'JOM-EXT-002',
  'High-speed 4TB portable. 4TB, 2000MB/s read/write, USB 3.2 Gen 2x2, IP55 rated, forged aluminum, carabiner loop, 5-year warranty.',
  'Fast 4TB portable - 2000MB/s',
  485000, 540000, 485000, 'instock', 20, 58, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Seagate IronWolf Pro 12TB NAS HDD',
  'seagate-ironwolf-pro-12tb',
  'JOM-HDD-001',
  'Enterprise NAS drive. 12TB, 7200 RPM, 256MB cache, CMR recording, 300TB/year workload, RV sensors, IronWolf Health Management.',
  '12TB NAS HDD for 24/7 operation',
  420000, 470000, 420000, 'instock', 18, 52, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'WD Red Plus 8TB NAS HDD',
  'wd-red-plus-8tb',
  'JOM-HDD-002',
  'Reliable NAS storage. 8TB, 5640 RPM, 256MB cache, CMR technology, NASware 3.0, 180TB/year workload, 3-year warranty.',
  '8TB CMR NAS drive - reliable',
  268000, 300000, 268000, 'instock', 28, 68, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 6: MONITORS & DISPLAYS (8 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS ROG Swift PG27AQDM 27" OLED Gaming Monitor',
  'asus-rog-swift-pg27aqdm-oled',
  'JOM-MON-001',
  'OLED gaming monitor. 27" QHD (2560x1440) OLED, 240Hz, 0.03ms GTG, G-SYNC, 99% DCI-P3, custom heatsink, DisplayWidget Center.',
  '27" OLED with 240Hz and 0.03ms',
  1050000, 1150000, 1050000, 'instock', 8, 48, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Samsung Odyssey OLED G8 34" Curved Gaming',
  'samsung-odyssey-oled-g8-34',
  'JOM-MON-002',
  'Ultrawide OLED gaming. 34" UWQHD (3440x1440) OLED, 175Hz, 0.03ms, 1800R curve, G-SYNC Compatible, HDR True Black 400, CoreSync.',
  '34" ultrawide OLED with 175Hz',
  1250000, 1380000, 1250000, 'instock', 6, 42, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'LG 27GR95QE-B 27" OLED Gaming Monitor',
  'lg-27gr95qe-b-oled',
  'JOM-MON-003',
  'OLED gaming monitor. 27" QHD (2560x1440) OLED, 240Hz, 0.03ms, G-SYNC Compatible, 98.5% DCI-P3, anti-glare coating, height-adjustable.',
  '27" OLED gaming at 240Hz',
  920000, 1020000, 920000, 'instock', 10, 52, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Dell UltraSharp U2723DE 27" QHD Monitor',
  'dell-ultrasharp-u2723de',
  'JOM-MON-004',
  'Productivity monitor. 27" QHD (2560x1440) IPS, 99% sRGB, USB-C hub 90W PD, daisy-chain, ComfortView Plus, factory calibrated.',
  '27" QHD with USB-C 90W hub',
  450000, 500000, 450000, 'instock', 20, 68, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'LG 32UN880-B 32" 4K Ergo Monitor',
  'lg-32un880-b-ergo',
  'JOM-MON-005',
  'Ergonomic 4K monitor. 32" UHD (3840x2160) IPS, 95% DCI-P3, HDR10, USB-C 60W PD, unique Ergo arm stand, height/tilt/swivel/pivot.',
  '32" 4K with unique Ergo arm stand',
  520000, 580000, 520000, 'instock', 15, 58, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'BenQ SW271C 27" 4K Photographer Monitor',
  'benq-sw271c',
  'JOM-MON-006',
  'Color-accurate display. 27" UHD IPS, 99% Adobe RGB, hardware calibration, USB-C 60W PD, hotkey puck, hood compatible.',
  '27" 4K for photographers - 99% Adobe RGB',
  585000, 650000, 585000, 'instock', 12, 48, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'MSI MAG342CQR 34" Curved Gaming Monitor',
  'msi-mag342cqr',
  'JOM-MON-007',
  'Ultrawide curved gaming. 34" UWQHD (3440x1440) VA, 180Hz, 1ms MPRT, 1500R curve, G-SYNC Compatible, Gaming OSD, VESA mount.',
  '34" curved ultrawide at 180Hz',
  420000, 470000, 420000, 'instock', 18, 72, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'AOC CU34G2X 34" Curved Gaming Monitor',
  'aoc-cu34g2x',
  'JOM-MON-008',
  'Budget ultrawide gaming. 34" UWQHD (3440x1440) VA, 144Hz, 1ms MPRT, 1500R curve, FreeSync Premium, height-adjustable stand.',
  'Budget 34" curved ultrawide - 144Hz',
  298000, 335000, 298000, 'instock', 25, 85, 4.70, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 7: KEYBOARDS & MICE (8 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Wooting 60HE+ Hall Effect Gaming Keyboard',
  'wooting-60he-plus',
  'JOM-KB-001',
  'Analog gaming keyboard. 60% layout, Lekker Hall Effect switches, adjustable actuation (0.1-4.0mm), rapid trigger, Tachyon mode, hot-swappable.',
  'Analog 60% with adjustable actuation',
  198000, 220000, 198000, 'instock', 15, 68, 4.95, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Keychron Q1 Pro 75% Mechanical Keyboard',
  'keychron-q1-pro',
  'JOM-KB-002',
  'Premium mechanical keyboard. 75% layout, wireless/wired, QMK/VIA, hot-swappable, gasket mount, aluminum frame, south-facing RGB.',
  'Premium wireless 75% with QMK/VIA',
  188000, 210000, 188000, 'instock', 20, 78, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Razer Huntsman V3 Pro Full-Size Gaming Keyboard',
  'razer-huntsman-v3-pro',
  'JOM-KB-003',
  'Pro gaming keyboard. Analog optical switches Gen-2, adjustable actuation, rapid trigger, 8000Hz polling, magnetic wrist rest, Chroma RGB.',
  'Analog optical keyboard - 8000Hz',
  248000, 280000, 248000, 'instock', 18, 58, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Logitech MX Keys S Wireless Keyboard',
  'logitech-mx-keys-s',
  'JOM-KB-004',
  'Productivity keyboard. Full-size, Perfect Stroke keys, smart backlighting, Easy-Switch (3 devices), Logi Bolt + Bluetooth, USB-C rechargeable.',
  'Premium wireless productivity keyboard',
  148000, 168000, 148000, 'instock', 35, 95, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Logitech G Pro X Superlight 2 Wireless Mouse',
  'logitech-g-pro-x-superlight-2',
  'JOM-MS-001',
  'Ultra-light esports mouse. 60g weight, HERO 2 32K sensor, LIGHTFORCE hybrid switches, 95-hour battery, POWERPLAY compatible, 5 buttons.',
  'Ultra-light 60g wireless esports mouse',
  168000, 188000, 168000, 'instock', 28, 88, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Razer Viper V3 Pro Wireless Gaming Mouse',
  'razer-viper-v3-pro',
  'JOM-MS-002',
  'Pro wireless gaming mouse. 54g weight, Focus Pro 30K sensor, optical switches Gen-3, 90-hour battery, HyperPolling dongle (8000Hz).',
  'Featherweight 54g wireless - 8000Hz',
  158000, 175000, 158000, 'instock', 25, 78, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Logitech MX Master 3S Wireless Mouse',
  'logitech-mx-master-3s',
  'JOM-MS-003',
  'Premium productivity mouse. 8000 DPI, MagSpeed scroll wheel, whisper-quiet clicks, Easy-Switch (3 devices), Logi Bolt + Bluetooth, USB-C.',
  'Premium productivity mouse with MagSpeed',
  118000, 135000, 118000, 'instock', 40, 102, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'SteelSeries Rival 3 Wireless Gaming Mouse',
  'steelseries-rival-3-wireless',
  'JOM-MS-004',
  'Budget wireless gaming. TrueMove Air sensor (18K DPI), 6 buttons, 400-hour battery, dual wireless (Bluetooth + 2.4GHz), 106g weight.',
  'Budget wireless gaming mouse',
  48000, 55000, 48000, 'instock', 55, 112, 4.65, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════
-- CATEGORY 8: NETWORKING & ACCESSORIES (7 products)
-- ══════════════════════════════════════════════════════════════

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'ASUS RT-BE96U WiFi 7 Router',
  'asus-rt-be96u-wifi7',
  'JOM-NET-001',
  'Next-gen WiFi 7 router. BE19000 quad-band (6GHz x2 + 5GHz + 2.4GHz), 10Gb WAN/LAN, 2.5Gb x4, AiMesh, AiProtection Pro, triple WAN.',
  'WiFi 7 quad-band with dual 10Gb ports',
  685000, 760000, 685000, 'instock', 8, 42, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Netgear RAXE500 Nighthawk WiFi 6E Router',
  'netgear-raxe500-wifi6e',
  'JOM-NET-002',
  'Tri-band WiFi 6E. AXE11000 (6GHz + 5GHz + 2.4GHz), 1.7GHz quad-core CPU, 10Gb LAN + Multi-Gig (2.5/5Gb), 8 streams, Nighthawk app.',
  'WiFi 6E tri-band with 10Gb LAN',
  520000, 580000, 520000, 'instock', 12, 52, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'TP-Link Archer AXE75 WiFi 6E Router',
  'tp-link-archer-axe75',
  'JOM-NET-003',
  'Value WiFi 6E router. AXE5400 tri-band, 6GHz band support, 1.7GHz quad-core, 4 streams, OneMesh, HomeShield, easy setup.',
  'Budget WiFi 6E tri-band router',
  168000, 188000, 168000, 'instock', 25, 78, 4.75, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'Ubiquiti UniFi Dream Machine Special Edition',
  'ubiquiti-udm-se',
  'JOM-NET-004',
  'Pro gateway. UniFi OS, 2.5Gb WAN, 8x GbE PoE+ LAN, UniFi Protect NVR (2.5" bay), IDS/IPS, VPN server, rack/desktop mount.',
  'Pro gateway with built-in NVR',
  520000, 580000, 520000, 'instock', 10, 48, 4.85, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'TP-Link Deco XE75 Pro WiFi 6E Mesh (3-Pack)',
  'tp-link-deco-xe75-pro-3pack',
  'JOM-NET-005',
  'WiFi 6E mesh system. AXE5400 tri-band, covers 6500 sq ft, 200+ devices, 2.5Gb backhaul, AI-Driven Mesh, HomeShield security.',
  'WiFi 6E mesh with 2.5Gb backhaul',
  385000, 430000, 385000, 'instock', 15, 62, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'SteelSeries Arctis Nova Pro Wireless Gaming Headset',
  'steelseries-arctis-nova-pro-wireless',
  'JOM-HS-001',
  'Premium wireless headset. Dual 2.4GHz + Bluetooth, 360° Spatial Audio, active noise cancellation, hot-swap battery, GameDAC Gen 2.',
  'Premium wireless with ANC and hot-swap',
  368000, 410000, 368000, 'instock', 18, 68, 4.90, 'publish'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO warespire_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status)
VALUES (
  'HyperX Cloud Alpha Wireless Gaming Headset',
  'hyperx-cloud-alpha-wireless',
  'JOM-HS-002',
  'Long-battery wireless headset. 300-hour battery, dual-chamber drivers, DTS Headphone:X, detachable mic, memory foam, aluminum frame.',
  'Wireless headset with 300hr battery',
  185000, 210000, 185000, 'instock', 22, 78, 4.80, 'publish'
) ON CONFLICT (slug) DO NOTHING;

-- ── Product Images ────────────────────────────────────────────

-- Laptops (sample - add all 75)
INSERT INTO warespire_product_images (product_id, src, name, alt, position)
SELECT p.id, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600', 'ASUS ROG Zephyrus', 'ASUS ROG Zephyrus G16', 0
FROM warespire_products p WHERE p.slug = 'asus-rog-zephyrus-g16' ON CONFLICT DO NOTHING;

INSERT INTO warespire_product_images (product_id, src, name, alt, position)
SELECT p.id, 'https://images.unsplash.com/photo-1625336960423-228c02f71e4f?w=600', 'MSI Titan', 'MSI Titan 18 HX', 0
FROM warespire_products p WHERE p.slug = 'msi-titan-18-hx' ON CONFLICT DO NOTHING;

-- Continue pattern for remaining products...

-- ── Product ↔ Category Links ──────────────────────────────────

-- Laptops & Notebooks
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('asus-rog-zephyrus-g16','msi-titan-18-hx','lenovo-legion-pro-7i-gen9','razer-blade-16','dell-xps-15-9530','hp-omen-16','lenovo-thinkpad-p16s-gen2','asus-vivobook-pro-16x-oled','acer-swift-x-14','macbook-pro-16-m3-max','microsoft-surface-laptop-5-15','lg-gram-17')
AND c.slug = 'laptops-notebooks'
ON CONFLICT DO NOTHING;

-- Desktop Computers
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('alienware-aurora-r16','nzxt-player-three-prime','cyberpower-gamer-supreme','hp-z2-tower-g9','dell-optiplex-7010-tower','apple-mac-studio-m2-ultra','intel-nuc-13-extreme','minisforum-neptune-hx100g','asus-rog-nuc-extreme')
AND c.slug = 'desktop-computers'
ON CONFLICT DO NOTHING;

-- Processors & Motherboards
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('intel-core-i9-14900k','amd-ryzen-9-7950x3d','intel-core-i7-14700k','amd-ryzen-7-7800x3d','intel-core-i5-14600k','asus-rog-maximus-z790-hero','msi-mpg-b760-gaming-edge-wifi','asus-rog-strix-x670e-e','gigabyte-b650-aorus-elite-ax-v2','asrock-z790-pg-lightning')
AND c.slug = 'processors-motherboards'
ON CONFLICT DO NOTHING;

-- Graphics Cards & Memory
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('asus-rog-strix-rtx-4090-oc','msi-rtx-4080-super-gaming-x-trio','gigabyte-rtx-4070-ti-super-eagle','amd-rx-7900-xtx-sapphire-nitro','asus-dual-rtx-4070-oc','gskill-trident-z5-64gb-6400','corsair-vengeance-32gb-6000','kingston-fury-beast-32gb-5600','noctua-nh-d15-chromax-black','corsair-icue-h150i-elite-capellix-xt','arctic-liquid-freezer-iii-280')
AND c.slug = 'graphics-cards-memory'
ON CONFLICT DO NOTHING;

-- Storage & Drives
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('samsung-990-pro-2tb','wd-black-sn850x-2tb','crucial-t700-2tb','kingston-kc3000-1tb','crucial-p3-plus-4tb','samsung-870-evo-2tb','samsung-t7-shield-2tb','sandisk-extreme-pro-portable-4tb','seagate-ironwolf-pro-12tb','wd-red-plus-8tb')
AND c.slug = 'storage-drives'
ON CONFLICT DO NOTHING;

-- Monitors & Displays
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('asus-rog-swift-pg27aqdm-oled','samsung-odyssey-oled-g8-34','lg-27gr95qe-b-oled','dell-ultrasharp-u2723de','lg-32un880-b-ergo','benq-sw271c','msi-mag342cqr','aoc-cu34g2x')
AND c.slug = 'monitors-displays'
ON CONFLICT DO NOTHING;

-- Keyboards & Mice
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('wooting-60he-plus','keychron-q1-pro','razer-huntsman-v3-pro','logitech-mx-keys-s','logitech-g-pro-x-superlight-2','razer-viper-v3-pro','logitech-mx-master-3s','steelseries-rival-3-wireless')
AND c.slug = 'keyboards-mice'
ON CONFLICT DO NOTHING;

-- Networking & Accessories
INSERT INTO warespire_product_categories (product_id, category_id)
SELECT p.id, c.id FROM warespire_products p, warespire_categories c
WHERE p.slug IN ('asus-rt-be96u-wifi7','netgear-raxe500-wifi6e','tp-link-archer-axe75','ubiquiti-udm-se','tp-link-deco-xe75-pro-3pack','steelseries-arctis-nova-pro-wireless','hyperx-cloud-alpha-wireless')
AND c.slug = 'networking-accessories'
ON CONFLICT DO NOTHING;

-- ── Update category product counts ───────────────────────────

UPDATE warespire_categories c
SET count = (
  SELECT COUNT(*) FROM warespire_product_categories pc WHERE pc.category_id = c.id
);