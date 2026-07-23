// 1. إعداد الاتصال بـ Supabase
// احصل على هذه البيانات من: Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = "https://hmzfmtbkdpqwhsxfdzit.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtemZtdGJrZHBxd2hzeGZkeml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDY1MDIsImV4cCI6MjEwMDMyMjUwMn0.TxPciGszwYha3o7yu_6j3L2KgyNyIXxjIyn2rxyPVsc"; 

const translations = {
  ar: {
    'nav-home': 'الرئيسية',
    'nav-products': 'المنتجات',
    'nav-login': 'تسجيل الدخول',
    'nav-signup': 'إنشاء حساب',
    'hero-badge': 'مغامرة الأنمي',
    'hero-title': 'أهلاً بيك في عالم الأنمي',
    'hero-desc': 'هنا هتلاقي كل حاجة ليها علاقة بالأنمي: سيوف، تيشيرتات، بوسترات، مجسمات، وكل ما يخص فانتازيا الأسلوب.',
    'browse-products': 'تصفح المنتجات',
    'create-account': 'إنشاء حساب',
    'feature-1': '⚔️ منتجات مستوحاة من شخصيات قوية',
    'feature-2': '🌈 ديكور نيون يبرز أسلوبك',
    'feature-3': '✨ تجربة مستخدم مميزة ومريحة',
    'login-title': '🔑 تسجيل الدخول',
    'login-desc': 'أدخل بياناتك للوصول إلى حسابك.',
    'email-label': 'البريد الإلكتروني',
    'password-label': 'كلمة المرور',
    'login-button': 'دخول',
    'signup-link': 'ليس لديك حساب؟ أنشئ واحداً الآن',
    'signup-title': '✨ إنشاء حساب جديد',
    'signup-desc': 'انضم إلى مجتمع الأنمي وابدأ رحلتك مع أفضل المنتجات.',
    'name-label': 'الاسم',
    'signup-button': 'إنشاء الحساب',
    'login-link': 'لديك حساب بالفعل؟ تسجيل الدخول',
    'products-title': '⚔️ قائمة منتجات الأنمي',
    'products-desc': 'اختر منتجك المفضل من السيوف، المجسمات، والبوسترات:',
    'email-placeholder': 'example@email.com',
    'password-placeholder': '••••••••',
    'name-placeholder': 'أدخل اسمك',
    'login-loading': 'جاري تسجيل الدخول...',
    'login-success': 'تم تسجيل الدخول بنجاح! جاري فتح المنتجات...',
    'signup-success': 'تم إنشاء الحساب بنجاح! جاري فتح المنتجات...',
    'generic-error': 'حدث خطأ غير متوقع'
  },
  en: {
    'nav-home': 'Home',
    'nav-products': 'Products',
    'nav-login': 'Login',
    'nav-signup': 'Sign up',
    'hero-badge': 'Anime Adventure',
    'hero-title': 'Welcome to the World of Anime',
    'hero-desc': 'Here you will find everything related to anime: swords, T-shirts, posters, figurines, and everything that fits the fantasy style.',
    'browse-products': 'Browse Products',
    'create-account': 'Create Account',
    'feature-1': '⚔️ Products inspired by powerful characters',
    'feature-2': '🌈 Neon decor that highlights your style',
    'feature-3': '✨ A smooth and premium user experience',
    'login-title': '🔑 Login',
    'login-desc': 'Enter your details to access your account.',
    'email-label': 'Email',
    'password-label': 'Password',
    'login-button': 'Login',
    'signup-link': 'Don’t have an account? Create one now',
    'signup-title': '✨ Create a new account',
    'signup-desc': 'Join the anime community and start your journey with the best products.',
    'name-label': 'Name',
    'signup-button': 'Create account',
    'login-link': 'Already have an account? Login',
    'products-title': '⚔️ Anime Products List',
    'products-desc': 'Choose your favorite product from swords, figurines, and posters:',
    'email-placeholder': 'example@email.com',
    'password-placeholder': '••••••••',
    'name-placeholder': 'Enter your name',
    'login-loading': 'Logging in...',
    'login-success': 'Login successful! Opening products...',
    'signup-success': 'Account created successfully! Opening products...',
    'generic-error': 'An unexpected error occurred'
  }
};

let currentLang = localStorage.getItem('anime-lang') || 'ar';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('anime-lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  if (typeof window.renderProducts === 'function') {
    window.renderProducts(lang);
  }
}

function showLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = '<div class="loader-core"></div>';
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add('hidden'), 700);
  setTimeout(() => loader.remove(), 1100);
}

const supabase = window.supabase?.createClient ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

function goToProducts() {
  showLoader();
  setTimeout(() => window.location.assign('products.html'), 700);
}

const loginForm = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';

    if (messageEl) {
      messageEl.style.color = '#00f3ff';
      messageEl.textContent = translations[currentLang]['login-loading'];
    }

    if (!supabase) {
      goToProducts();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (messageEl) {
          messageEl.style.color = '#ff007f';
          messageEl.textContent = 'خطأ: ' + error.message;
        }
      } else {
        if (messageEl) {
          messageEl.style.color = '#ffe600';
          messageEl.textContent = translations[currentLang]['login-success'];
        }
        goToProducts();
      }
    } catch (err) {
      if (messageEl) {
        messageEl.style.color = '#ff007f';
        messageEl.textContent = translations[currentLang]['generic-error'];
      }
      goToProducts();
    }
  });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name')?.value || '';
    const email = document.getElementById('signup-email')?.value || '';
    const password = document.getElementById('signup-password')?.value || '';

    if (!name || !email || !password) {
      return;
    }

    if (messageEl) {
      messageEl.style.color = '#ffe600';
      messageEl.textContent = translations[currentLang]['signup-success'];
    }
    goToProducts();
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

setLanguage(currentLang);