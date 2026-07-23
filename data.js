/* ==========================================================================
   World Of Anime - بيانات المنتجات + Supabase
   ========================================================================== */

// 1. Supabase Config
const SUPABASE_URL = "https://ogfmshoffpvonsxhyzzp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZm1zaG9mZnB2b25zeGh5enpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTQ4NjIsImV4cCI6MjEwMDM5MDg2Mn0.9-R20Hod0hrtSQZdAL5FLq-nx5AIPM7-BaPxQ-yJhuI";

let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// 2. التصنيفات
const CATEGORIES = [
  { id: 'swords', name: { ar: '⚔️ السيوف', en: '⚔️ Swords' }, icon: '⚔️' },
  { id: 'figures', name: { ar: '🗿 المجسمات', en: '🗿 Figures' }, icon: '🗿' },
  { id: 'posters', name: { ar: '🖼️ البوسترات', en: '🖼️ Posters' }, icon: '🖼️' },
  { id: 'tshirts', name: { ar: '👕 الملابس', en: '👕 Clothing' }, icon: '👕' },
  { id: 'accessories', name: { ar: '💎 الإكسسوارات', en: '💎 Accessories' }, icon: '💎' },
  { id: 'manga', name: { ar: '📚 المانجا', en: '📚 Manga' }, icon: '📚' }
];

// 3. المنتجات
const PRODUCTS = [
  {
    id: 1, title: { ar: 'سيف كاتانا زورو - One Piece', en: 'Zoro Katana Sword - One Piece' },
    description: { ar: 'سيف كاتانا replicas لزورو من ون بيس، مصنوع من الستانلس ستيل بطول 104 سم.', en: 'Replica katana sword of Zoro from One Piece, made of stainless steel, 104cm length.' },
    price: 850, oldPrice: 1100, category: 'swords', rating: 4.8, reviews: 124,
    images: ['https://images.unsplash.com/photo-1589656966895-2f33d7653819?auto=format&fit=crop&w=800&q=80'],
    sizes: ['104cm', '80cm'], badge: 'bestseller', stock: 15, sold: 87
  },
  {
    id: 2, title: { ar: 'مجسم لوفي Gear 5 - One Piece', en: 'Luffy Gear 5 Figure - One Piece' },
    description: { ar: 'مجسم لوفي بشكل Gear 5 بتفاصيل دقيقة وخامة PVC عالية الجودة، ارتفاع 25 سم.', en: 'Luffy Gear 5 figure with precise details and high quality PVC, 25cm height.' },
    price: 650, oldPrice: null, category: 'figures', rating: 4.9, reviews: 89,
    images: ['https://images.unsplash.com/photo-1608889825103-5041190c1d9f?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'bestseller', stock: 8, sold: 156
  },
  {
    id: 3, title: { ar: 'بوستر ناروتو شيبودن', en: 'Naruto Shippuden Poster' },
    description: { ar: 'بوستر عالي الجودة لناروتو أوزوماكي بحجم A3، طباعة على ورق لامع.', en: 'High quality Naruto Uzumaki poster A3 size, printed on glossy paper.' },
    price: 120, oldPrice: 180, category: 'posters', rating: 4.5, reviews: 56,
    images: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'],
    sizes: ['A3', 'A2', 'A1'], badge: 'sale', stock: 50, sold: 210
  },
  {
    id: 4, title: { ar: 'تيشيرت Attack on Titan', en: 'Attack on Titan T-Shirt' },
    description: { ar: 'تيشيرت قطن 100% بطباعة شعار فيلق الاستكشاف، مريح وعملي.', en: '100% cotton t-shirt with Survey Corps logo print, comfortable and practical.' },
    price: 280, oldPrice: 350, category: 'tshirts', rating: 4.6, reviews: 73,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'], badge: 'sale', stock: 30, sold: 94
  },
  {
    id: 5, title: { ar: 'قلادة سيف جيرالت - Witcher', en: 'Geralt Sword Necklace - Witcher' },
    description: { ar: 'سلسلة معدنية بتصميم سيف جيرالت، مقاومة للصدأ بطول 50 سم.', en: 'Metal necklace with Geralt sword design, rust resistant, 50cm length.' },
    price: 150, oldPrice: null, category: 'accessories', rating: 4.7, reviews: 41,
    images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: null, stock: 25, sold: 68
  },
  {
    id: 6, title: { ar: 'مانجا Demon Slayer Vol.1', en: 'Demon Slayer Manga Vol.1' },
    description: { ar: 'المجلد الأول من مانجا ديمون سلاير بالعربية، طبعة فاخرة.', en: 'First volume of Demon Slayer manga in Arabic, premium edition.' },
    price: 250, oldPrice: null, category: 'manga', rating: 4.9, reviews: 112,
    images: ['https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'bestseller', stock: 40, sold: 320
  },
  {
    id: 7, title: { ar: 'سيف تانجيرو - Demon Slayer', en: 'Tanjiro Sword - Demon Slayer' },
    description: { ar: 'سيف نيتشيرين الأسود لتانجيرو كامادو من ديمون سلاير.', en: 'Tanjiro\'s black Nichirin sword from Demon Slayer.' },
    price: 780, oldPrice: 950, category: 'swords', rating: 4.7, reviews: 67,
    images: ['https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=800&q=80'],
    sizes: ['100cm', '80cm'], badge: 'sale', stock: 12, sold: 45
  },
  {
    id: 8, title: { ar: 'مجسم ناروتو سيج Sage Mode', en: 'Naruto Sage Mode Figure' },
    description: { ar: 'مجسم ناروتو بوضع الحكيم (Sage Mode) ارتفاع 30 سم.', en: 'Naruto Sage Mode figure, 30cm height with detailed paint.' },
    price: 550, oldPrice: null, category: 'figures', rating: 4.6, reviews: 45,
    images: ['https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'new', stock: 20, sold: 33
  },
  {
    id: 9, title: { ar: 'بوستر One Piece Wanted', en: 'One Piece Wanted Poster Set' },
    description: { ar: 'مجموعة بوسترات Wanted لطاقم قبعة القش، 9 بوسترات.', en: 'Wanted poster set for the Straw Hat crew, 9 posters.' },
    price: 200, oldPrice: 280, category: 'posters', rating: 4.4, reviews: 38,
    images: ['https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&w=800&q=80'],
    sizes: ['A4', 'A3'], badge: 'sale', stock: 60, sold: 175
  },
  {
    id: 10, title: { ar: 'هودي Jujutsu Kaisen', en: 'Jujutsu Kaisen Hoodie' },
    description: { ar: 'هودي قطن بطباعة شعار مدرسة جوجوتسو، دافئ ومريح.', en: 'Cotton hoodie with Jujutsu school logo, warm and comfortable.' },
    price: 450, oldPrice: null, category: 'tshirts', rating: 4.8, reviews: 91,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'new', stock: 18, sold: 62
  },
  {
    id: 11, title: { ar: 'خاتم ناروتو أكاتسكي', en: 'Naruto Akatsuki Ring Set' },
    description: { ar: 'طقم 10 خواتم أكاتسكي معدنية عالية الجودة.', en: 'Set of 10 metal Akatsuki rings, high quality.' },
    price: 180, oldPrice: 250, category: 'accessories', rating: 4.5, reviews: 63,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b7649e?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'sale', stock: 35, sold: 142
  },
  {
    id: 12, title: { ar: 'مانجا One Piece Vol.1', en: 'One Piece Manga Vol.1' },
    description: { ar: 'المجلد الأول من مانجا ون بيس بالعربية.', en: 'First volume of One Piece manga in Arabic.' },
    price: 230, oldPrice: null, category: 'manga', rating: 4.8, reviews: 98,
    images: ['https://images.unsplash.com/photo-1618522285330-291080ae3392?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: null, stock: 45, sold: 280
  },
  {
    id: 13, title: { ar: 'سيف إيتشيغو - Bleach', en: 'Ichigo Zangetsu Sword - Bleach' },
    description: { ar: 'سيف زانجيتسو لإيتشيغو كوروساكي من بليتش.', en: 'Ichigo\'s Zangetsu sword from Bleach anime.' },
    price: 900, oldPrice: 1200, category: 'swords', rating: 4.9, reviews: 55,
    images: ['https://images.unsplash.com/photo-1589656966895-2f33d7653819?auto=format&fit=crop&w=800&q=80'],
    sizes: ['120cm', '100cm'], badge: 'sale', stock: 6, sold: 28
  },
  {
    id: 14, title: { ar: 'مجسم إرين تيتان - Attack on Titan', en: 'Eren Titan Figure - AOT' },
    description: { ar: 'مجسم إرين ييغر بشكل التيتان المهاجم، ارتفاع 28 سم.', en: 'Eren Yeager Attack Titan figure, 28cm height.' },
    price: 720, oldPrice: null, category: 'figures', rating: 4.7, reviews: 34,
    images: ['https://images.unsplash.com/photo-1608889825103-5041190c1d9f?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'new', stock: 10, sold: 19
  },
  {
    id: 15, title: { ar: 'بوستر Dragon Ball Super', en: 'Dragon Ball Super Poster' },
    description: { ar: 'بوستر جوكو Ultra Instinct بجودة طباعة عالية.', en: 'Goku Ultra Instinct poster with premium print quality.' },
    price: 130, oldPrice: null, category: 'posters', rating: 4.3, reviews: 29,
    images: ['https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'],
    sizes: ['A3', 'A2'], badge: null, stock: 70, sold: 95
  },
  {
    id: 16, title: { ar: 'جاكيت My Hero Academia', en: 'My Hero Academia Jacket' },
    description: { ar: 'جاكيت على تصميم زي مدرسة UA للبطل الأكاديمي.', en: 'Jacket inspired by UA school uniform from My Hero Academia.' },
    price: 520, oldPrice: 680, category: 'tshirts', rating: 4.6, reviews: 47,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'], badge: 'sale', stock: 22, sold: 58
  },
  {
    id: 17, title: { ar: 'أقراط تانجيرو - Demon Slayer', en: 'Tanjiro Earrings - Demon Slayer' },
    description: { ar: 'أقراط هانافودا المميزة لتانجيرو كامادو.', en: 'Tanjiro\'s iconic Hanafuda earrings from Demon Slayer.' },
    price: 85, oldPrice: null, category: 'accessories', rating: 4.4, reviews: 72,
    images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: null, stock: 40, sold: 185
  },
  {
    id: 18, title: { ar: 'مانجا Jujutsu Kaisen Vol.1', en: 'Jujutsu Kaisen Manga Vol.1' },
    description: { ar: 'المجلد الأول من مانجا جوجوتسو كايسن بالعربية.', en: 'First volume of Jujutsu Kaisen manga in Arabic.' },
    price: 240, oldPrice: null, category: 'manga', rating: 4.7, reviews: 86,
    images: ['https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'new', stock: 35, sold: 110
  },
  {
    id: 19, title: { ar: 'سيف سينجوكو - One Piece', en: 'Shanks Sword - One Piece' },
    description: { ar: 'سيف شانكس ذو الشعر الأحمر من ون بيس.', en: 'Red Haired Shanks\' sword from One Piece.' },
    price: 820, oldPrice: null, category: 'swords', rating: 4.8, reviews: 42,
    images: ['https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=800&q=80'],
    sizes: ['100cm'], badge: null, stock: 9, sold: 37
  },
  {
    id: 20, title: { ar: 'مجسم جوكو Ultra Instinct', en: 'Goku Ultra Instinct Figure' },
    description: { ar: 'مجسم جوكو بوضع Ultra Instinct، ارتفاع 32 سم مع قاعدة مضيئة.', en: 'Goku Ultra Instinct figure, 32cm height with LED base.' },
    price: 880, oldPrice: 1100, category: 'figures', rating: 4.9, reviews: 156,
    images: ['https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800&q=80'],
    sizes: [], badge: 'bestseller', stock: 5, sold: 203
  }
];

// 4. دوال التقييمات (Supabase)
async function getReviews(productId) {
  if (!supabaseClient) {
    // Fallback to localStorage
    try { return JSON.parse(localStorage.getItem('anime-reviews-' + productId)) || []; } catch { return []; }
  }
  try {
    const { data, error } = await supabaseClient
      .from('reviews').select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    if (error) { console.error('Reviews error:', error.message); return []; }
    return data || [];
  } catch (err) { console.error('Reviews error:', err); return []; }
}

async function saveReview(productId, review) {
  // Always save to localStorage as well
  const local = JSON.parse(localStorage.getItem('anime-reviews-' + productId) || '[]');
  local.unshift({ ...review, product_id: productId, created_at: new Date().toISOString() });
  localStorage.setItem('anime-reviews-' + productId, JSON.stringify(local));

  if (!supabaseClient) return true;
  try {
    const { error } = await supabaseClient.from('reviews').insert([{
      product_id: productId, author: review.author,
      rating: parseInt(review.rating), text: review.text
    }]);
    if (error) { console.error('Save review error:', error.message); return false; }
    return true;
  } catch (err) { console.error('Save review error:', err); return false; }
}

// 5. دوال الطلبات (Supabase)
async function saveOrder(orderData) {
  // Always save to localStorage
  const orders = JSON.parse(localStorage.getItem('anime-orders') || '[]');
  orderData.id = orderData.id || 'ORD-' + Date.now();
  orders.push(orderData);
  localStorage.setItem('anime-orders', JSON.stringify(orders));

  if (!supabaseClient) return orderData;
  try {
    const { data, error } = await supabaseClient.from('orders').insert([orderData]).select();
    if (error) { console.error('Save order error:', error.message); return orderData; }
    return data ? data[0] : orderData;
  } catch (err) { console.error('Save order error:', err); return orderData; }
}
