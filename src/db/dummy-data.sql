
-- Dummy coin data for CoinGlobe marketplace
-- Insert sample coin listings with realistic data

-- First, let's create some sample sellers (assuming profiles table exists)
INSERT INTO profiles (id, full_name, avatar_url) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Rajesh Kumar', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
('550e8400-e29b-41d4-a716-446655440001', 'Priya Sharma', 'https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150'),
('550e8400-e29b-41d4-a716-446655440002', 'Amit Patel', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('550e8400-e29b-41d4-a716-446655440003', 'Sunita Devi', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150')
ON CONFLICT (id) DO NOTHING;

-- Ancient Indian Coins
INSERT INTO coin_listings (
  id, title, description, mint_date, region, value, rarity, verified, images, 
  seller_id, stock_quantity, metal, dynasty, ruler, condition, created_at, updated_at
) VALUES
-- Mauryan Empire Coins
('550e8400-e29b-41d4-a716-446655440010', 
 'Mauryan Silver Karshapana 321-297 BC', 
 'Rare silver punch-marked coin from the Mauryan Empire under Chandragupta Maurya. Features traditional punch marks including sun, six-armed symbol, and elephant. Museum quality specimen with excellent preservation.',
 '321-297 BC', 'Mauryan Empire', 45000, 'Extremely Rare', true,
 '{"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600", "https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600"}',
 '550e8400-e29b-41d4-a716-446655440000', 1, 'Silver', 'Mauryan', 'Chandragupta Maurya', 'Very Fine', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440011',
 'Gupta Gold Dinar 375-415 AD',
 'Magnificent gold dinar from the Gupta Empire featuring Chandragupta II on horseback. Considered the pinnacle of ancient Indian coinage with exceptional artistic detail and historical significance.',
 '375-415 AD', 'Gupta Empire', 125000, 'Extremely Rare', true,
 '{"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600", "https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600"}',
 '550e8400-e29b-41d4-a716-446655440001', 1, 'Gold', 'Gupta', 'Chandragupta II', 'Excellent', NOW(), NOW()),

-- Mughal Empire Coins  
('550e8400-e29b-41d4-a716-446655440012',
 'Mughal Gold Mohur Akbar 1590 AD',
 'Stunning gold mohur from Emperor Akbar''s reign featuring beautiful Persian calligraphy. This coin represents the zenith of Mughal monetary artistry with intricate design and superior craftsmanship.',
 '1590 AD', 'Mughal Empire', 85000, 'Very Rare', true,
 '{"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600", "https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600"}',
 '550e8400-e29b-41d4-a716-446655440002', 1, 'Gold', 'Mughal', 'Akbar', 'Fine', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440013',
 'Shah Jahan Silver Rupee 1658 AD',
 'Beautiful silver rupee from the last year of Shah Jahan''s reign. Features the emperor''s name and titles in elegant Persian script. Historically significant as it marks the end of Shah Jahan''s rule.',
 '1658 AD', 'Mughal Empire', 25000, 'Rare', true,
 '{"https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600", "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600"}',
 '550e8400-e29b-41d4-a716-446655440003', 2, 'Silver', 'Mughal', 'Shah Jahan', 'Very Fine', NOW(), NOW()),

-- British India Coins
('550e8400-e29b-41d4-a716-446655440014',
 'British India Victoria Silver Rupee 1835',
 'Early East India Company silver rupee featuring young Queen Victoria. Minted in Calcutta with the company''s coat of arms. Represents the transition period of British colonial monetary system.',
 '1835 AD', 'British India', 15000, 'Rare', true,
 '{"https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600", "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600"}',
 '550e8400-e29b-41d4-a716-446655440000', 3, 'Silver', 'British Colonial', 'Victoria', 'Fine', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440015',
 'British India Gold Mohur George V 1918',
 'Rare gold mohur from King George V period during World War I. Limited mintage makes this extremely collectible. Features the king''s portrait and Indian denomination.',
 '1918 AD', 'British India', 75000, 'Very Rare', true,
 '{"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600", "https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600"}',
 '550e8400-e29b-41d4-a716-446655440001', 1, 'Gold', 'British Colonial', 'George V', 'Very Fine', NOW(), NOW()),

-- South Indian Kingdoms
('550e8400-e29b-41d4-a716-446655440016',
 'Chola Dynasty Gold Pagoda 1010 AD',
 'Exquisite gold pagoda from the Chola Empire under Raja Raja I. Features standing figure of Lakshmi and Tamil inscriptions. Represents the maritime trade prosperity of the Cholas.',
 '1010 AD', 'Chola Empire', 55000, 'Very Rare', true,
 '{"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600", "https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600"}',
 '550e8400-e29b-41d4-a716-446655440002', 2, 'Gold', 'Chola', 'Raja Raja I', 'Excellent', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440017',
 'Vijayanagara Gold Varaha 1400 AD',
 'Beautiful gold varaha from the Vijayanagara Empire featuring the boar avatar of Vishnu. Represents the religious and cultural richness of medieval South India.',
 '1400 AD', 'Vijayanagara Empire', 48000, 'Rare', true,
 '{"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600", "https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600"}',
 '550e8400-e29b-41d4-a716-446655440003', 1, 'Gold', 'Vijayanagara', 'Harihara II', 'Fine', NOW(), NOW()),

-- Regional Kingdoms
('550e8400-e29b-41d4-a716-446655440018',
 'Maratha Silver Rupee Shivaji 1674 AD',
 'Historic silver rupee from Chhatrapati Shivaji''s coronation year. Features Devanagari inscription and represents the foundation of the Maratha Empire.',
 '1674 AD', 'Maratha Empire', 35000, 'Very Rare', true,
 '{"https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600", "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600"}',
 '550e8400-e29b-41d4-a716-446655440000', 1, 'Silver', 'Maratha', 'Shivaji', 'Very Fine', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440019',
 'Mysore Silver Double Rupee Tipu Sultan 1790',
 'Rare double rupee from Tipu Sultan''s reign featuring Persian and Devanagari inscriptions. Historically significant as it represents resistance against British expansion.',
 '1790 AD', 'Mysore Kingdom', 42000, 'Extremely Rare', true,
 '{"https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600", "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600"}',
 '550e8400-e29b-41d4-a716-446655440001', 1, 'Silver', 'Mysore', 'Tipu Sultan', 'Fine', NOW(), NOW()),

-- Modern Collection Coins
('550e8400-e29b-41d4-a716-446655440020',
 'Republic India Proof Set 1950',
 'Complete proof set from the first year of the Indian Republic. Includes all denominations from 1 pice to 1 rupee. Pristine condition with original government packaging.',
 '1950 AD', 'Republic of India', 18000, 'Rare', true,
 '{"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600", "https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600"}',
 '550e8400-e29b-41d4-a716-446655440002', 5, 'Mixed Metals', 'Republic', 'Government of India', 'Mint', NOW(), NOW()),

-- Common collectible coins for beginners
('550e8400-e29b-41d4-a716-446655440021',
 'British India Quarter Anna Victoria 1862',
 'Common but well-preserved quarter anna from Queen Victoria''s reign. Perfect for beginners starting their colonial coin collection.',
 '1862 AD', 'British India', 2500, 'Common', false,
 '{"https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=600"}',
 '550e8400-e29b-41d4-a716-446655440003', 8, 'Copper', 'British Colonial', 'Victoria', 'Good', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440022',
 'Republic India 1 Rupee Nehru Commemorative 1964',
 'Commemorative rupee issued on Nehru''s death anniversary. Popular among collectors and historically significant.',
 '1964 AD', 'Republic of India', 1200, 'Uncommon', false,
 '{"https://images.unsplash.com/photo-1567596388756-b5d7c0a8e8d5?w=600"}',
 '550e8400-e29b-41d4-a716-446655440000', 12, 'Nickel', 'Republic', 'Government of India', 'Very Fine', NOW(), NOW());

-- Insert some sample reviews for these coins
INSERT INTO reviews (id, coin_id, user_id, rating, comment, created_at) VALUES
('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 5, 'Absolutely stunning coin! The gold has a beautiful patina and the details are crisp. Seller was very professional and shipped securely.', NOW()),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 4, 'Beautiful Mughal coin with excellent provenance. Slightly worn but still displays the intricate calligraphy well. Fast shipping!', NOW()),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 5, 'Perfect addition to my Mughal collection. The coin matches the description exactly and arrived well-packaged.', NOW()),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440000', 4, 'Nice colonial period coin. Good condition for the age. Seller provided detailed authentication certificate.', NOW()),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440001', 5, 'Exceptional Chola gold coin! The craftsmanship is remarkable. This is definitely a museum-quality piece.', NOW());
