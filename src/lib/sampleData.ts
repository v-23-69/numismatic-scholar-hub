
import { supabase } from '@/integrations/supabase/client';

export const sampleCoins = [
  {
    title: "Ancient Roman Denarius - Marcus Aurelius",
    description: "A beautiful silver denarius featuring Emperor Marcus Aurelius. This coin dates from 161-180 AD and showcases exceptional detail and preservation.",
    mint_date: "161-180 AD",
    region: "Roman Empire",
    value: 15000,
    rarity: "Rare",
    metal: "Silver",
    dynasty: "Roman Empire",
    ruler: "Marcus Aurelius",
    condition: "Good",
    stock_quantity: 3,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622838006600-bc08958dd99e?w=600&auto=format&fit=crop&q=80"
    ],
    verified: true
  },
  {
    title: "Mughal Silver Rupee - Akbar",
    description: "An authentic Mughal silver rupee from the reign of Emperor Akbar. Features beautiful Kalima inscription and mint mark.",
    mint_date: "1580 AD",
    region: "India",
    value: 8500,
    rarity: "Uncommon",
    metal: "Silver",
    dynasty: "Mughal India",
    ruler: "Akbar",
    condition: "Good",
    stock_quantity: 5,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80"
    ],
    verified: true
  },
  {
    title: "British India Quarter Anna - Queen Victoria",
    description: "Colonial era quarter anna coin featuring Queen Victoria. An excellent example of British Indian coinage from the Victorian period.",
    mint_date: "1897",
    region: "India",
    value: 2500,
    rarity: "Common",
    metal: "Copper",
    dynasty: "British India",
    ruler: "Queen Victoria",
    condition: "Fair",
    stock_quantity: 10,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80"
    ],
    verified: false
  },
  {
    title: "Ancient Indian Punch Marked Silver",
    description: "Rare punch marked silver coin from ancient India, featuring multiple symbols. Dating from 600-300 BCE, representing early Indian coinage.",
    mint_date: "500 BCE",
    region: "India",
    value: 25000,
    rarity: "Extremely Rare",
    metal: "Silver",
    dynasty: "Ancient India",
    ruler: "Janapada Period",
    condition: "Fair",
    stock_quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80"
    ],
    verified: true
  },
  {
    title: "Republic India 1 Rupee - First Series",
    description: "First series 1 rupee coin from independent India. Features the Lion Capital of Ashoka and wheat ears, symbolizing new India.",
    mint_date: "1950",
    region: "India",
    value: 1200,
    rarity: "Common",
    metal: "Nickel",
    dynasty: "Republic India",
    ruler: "Government of India",
    condition: "Mint",
    stock_quantity: 15,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80"
    ],
    verified: false
  },
  {
    title: "Byzantine Gold Solidus - Justinian I",
    description: "Exceptional Byzantine gold solidus featuring Emperor Justinian I. This coin represents the height of Byzantine monetary artistry.",
    mint_date: "527-565 AD",
    region: "Byzantine Empire",
    value: 45000,
    rarity: "Very Rare",
    metal: "Gold",
    dynasty: "Byzantine Empire",
    ruler: "Justinian I",
    condition: "Good",
    stock_quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80"
    ],
    verified: true
  }
];

export const insertSampleCoins = async () => {
  try {
    for (const coin of sampleCoins) {
      const { error } = await supabase
        .from('coin_listings')
        .insert({
          ...coin,
          seller_id: 'system', // You may need to replace with actual seller ID
        });
      
      if (error) {
        console.error('Error inserting coin:', error);
      }
    }
    console.log('Sample coins inserted successfully');
  } catch (error) {
    console.error('Error inserting sample coins:', error);
  }
};
