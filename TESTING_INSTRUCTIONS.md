
# CoinGlobe E-commerce Testing Instructions

## Prerequisites
1. Ensure Supabase is connected and configured
2. Run the dummy data SQL script to populate the database
3. Have at least one user account created for testing

## Required Supabase Tables

Before testing, ensure these tables exist in your Supabase database:

```sql
-- Coin listings table (should already exist)
CREATE TABLE IF NOT EXISTS coin_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  mint_date TEXT,
  region TEXT,
  value NUMERIC NOT NULL,
  rarity TEXT CHECK (rarity IN ('Common', 'Uncommon', 'Rare', 'Very Rare', 'Extremely Rare')),
  verified BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  seller_id UUID REFERENCES profiles(id),
  stock_quantity INTEGER DEFAULT 1,
  metal TEXT,
  dynasty TEXT,
  ruler TEXT,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  coin_id UUID REFERENCES coin_listings(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  shipping_address_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  coin_id UUID REFERENCES coin_listings(id),
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping addresses table
CREATE TABLE IF NOT EXISTS shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  address_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  coin_id UUID REFERENCES coin_listings(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing Scenarios

### 1. Featured Coins Section (Homepage)
- ✅ Navigate to homepage
- ✅ Verify Featured Coins section loads with real data
- ✅ Click on a featured coin - should navigate to coin details page
- ✅ Hover over coins to see "Add to Cart" and "Add to Wishlist" buttons
- ✅ Test "Add to Cart" functionality (requires login)

### 2. Coin Details Page
- ✅ Navigate to `/coins-market/{coin-id}` 
- ✅ Verify coin details load correctly (images, description, price)
- ✅ Test image gallery navigation if multiple images
- ✅ Test quantity selector
- ✅ Test "Add to Cart" button
- ✅ Test "Buy Now" button (should redirect to checkout)
- ✅ Test review submission (requires login)
- ✅ Verify reviews display correctly

### 3. Shopping Cart Flow
- ✅ Add items to cart from various pages
- ✅ Navigate to `/cart`
- ✅ Verify cart items display with correct quantities and prices
- ✅ Test quantity update functionality
- ✅ Test item removal
- ✅ Test "Proceed to Checkout" button

### 4. Checkout Process
- ✅ Navigate to `/checkout` with items in cart
- ✅ Fill shipping address form with all required fields
- ✅ Verify order summary displays correctly
- ✅ Test "Place Order" button
- ✅ Payment modal should appear with payment options
- ✅ Test each payment method (UPI, Card, Net Banking)
- ✅ Verify payment simulation works (check console logs)
- ✅ Successful payment should redirect to confirmation page

### 5. Order Confirmation & Notifications
- ✅ Verify order confirmation page displays order details
- ✅ Check browser console for notification logs:
  - Email confirmation
  - SMS notification  
  - WhatsApp message
- ✅ Navigate to orders page to see order history

### 6. Seller Dashboard
- ✅ Sign in with seller email (`vishal23mentoratnsh@gmail.com`)
- ✅ Navigate to `/seller-dashboard`
- ✅ Verify dashboard loads with stats and listings
- ✅ Test "Add New Listing" functionality
- ✅ Fill coin listing form and submit
- ✅ Verify new listing appears in dashboard

### 7. Order History
- ✅ Navigate to `/orders`
- ✅ Verify past orders display correctly
- ✅ Check order status, items, and amounts
- ✅ Test order details expansion

## Console Log Monitoring

During testing, monitor browser console for:

### Payment Simulation Logs
```
Processing UPI Payment: {amount: 50000, currency: "INR", ...}
✅ UPI Payment successful: UPI_1234567890_abc123
```

### Notification Simulation Logs
```
📧 Sending order confirmation email: {...}
✅ Email sent successfully to user@example.com

📱 Sending SMS notification: {...}
✅ SMS sent successfully to +91XXXXXXXXXX

📲 Sending WhatsApp notification: {...}
✅ WhatsApp message sent successfully to +91XXXXXXXXXX
```

## Expected Behaviors

### Success Cases
- All coin listings load with proper images and data
- Cart operations work smoothly
- Checkout flow completes without errors
- Payment simulation shows realistic success/failure rates
- Notifications log correctly to console
- Order confirmation redirects properly

### Error Handling
- Proper error messages for invalid form data
- Graceful handling of payment failures
- Loading states during async operations
- Redirect to login when accessing protected features

## Performance Checks
- Page load times should be reasonable
- Images should load progressively
- No memory leaks during navigation
- Responsive design works on mobile

## Database Verification

After testing, verify in Supabase:
- New orders appear in `orders` table
- Order items saved in `order_items` table  
- Cart items cleared after successful checkout
- Reviews saved in `reviews` table
- Shipping addresses stored correctly

## Common Issues & Solutions

### "Coin Not Found" Error
- Ensure dummy data script was run
- Check coin IDs match between Featured Coins and database
- Verify coin_listings table has data

### Payment Modal Issues
- Check z-index conflicts
- Verify payment service is imported
- Ensure payment methods are properly configured

### Cart Issues
- Check user authentication
- Verify cart_items table exists and has proper relationships
- Test with different user accounts

### Review System Issues
- Ensure reviews table exists
- Check foreign key relationships
- Verify user can only review coins they've purchased (if implemented)

## Production Deployment Checklist

Before going live:
- [ ] Replace dummy payment with real payment gateway
- [ ] Implement real email/SMS services
- [ ] Add proper error logging and monitoring
- [ ] Implement rate limiting for API calls
- [ ] Add proper image upload functionality
- [ ] Implement proper authentication and authorization
- [ ] Add data validation and sanitization
- [ ] Set up proper backup and recovery procedures
```
