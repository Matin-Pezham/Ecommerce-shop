import { createContext, createElement, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'

export type Locale = 'en' | 'fa'

type TranslationParams = Record<string, string | number>
type TranslationNode = string | Record<string, unknown>

export type TranslationContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  setLocale: (locale: Locale) => void
  t: (key: string, params?: TranslationParams) => string
  formatPrice: (value: number) => string
  formatDate: (value: string | Date) => string
  formatNumber: (value: number) => string
  formatOrderStatus: (status: string) => string
}

const translations: Record<Locale, TranslationNode> = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      remove: 'Remove',
      continue: 'Continue',
      back: 'Back',
      close: 'Close',
      loading: 'Loading',
      empty: 'No items yet.',
      error: 'Something went wrong.',
      viewAll: 'View all',
      viewDetails: 'View details',
      shopNow: 'Shop now',
      viewCart: 'View cart',
      continueShopping: 'Continue shopping',
      checkout: 'Continue to checkout',
    },
    brand: { name: 'NORTHSTAR', subtitle: 'Atelier' },
    nav: {
      home: 'Home',
      shop: 'Shop',
      collections: 'Collections',
      newArrivals: 'New Arrivals',
      journal: 'Journal',
      about: 'About',
      shopNow: 'Shop now',
      viewCart: 'View cart',
      search: 'Search',
      wishlist: 'Wishlist',
      account: 'Account',
      cart: 'Cart',
      toggleMenu: 'Toggle navigation menu',
      closeMenu: 'Close menu',
      primaryNavigation: 'Primary navigation',
      quickLinks: 'Quick links',
      searchTitle: 'Search the collection',
      searchPlaceholder: 'Search for essentials, accessories, and more',
      searchHint: 'A refined search experience will arrive soon.',
      searchCta: 'Explore now',
      placeholderBadge: 'Coming soon',
      shopPlaceholderTitle: 'The boutique shop is opening soon',
      shopPlaceholderDescription: 'A curated merchandise experience is being prepared with premium essentials, refined accessories, and elevated gifting.',
      collectionsPlaceholderTitle: 'Collections are being thoughtfully curated',
      collectionsPlaceholderDescription: 'Discover seasonal capsules and signature stories crafted for modern living, each presented with calm clarity.',
      arrivalsPlaceholderTitle: 'New arrivals are on the way',
      arrivalsPlaceholderDescription: 'The next drop will arrive soon with fresh silhouettes and carefully considered details for every season.',
      journalPlaceholderTitle: 'The journal is being prepared',
      journalPlaceholderDescription: 'Editorial stories, style notes, and behind-the-scenes craft will be shared here soon.',
      aboutPlaceholderTitle: 'About the house',
      aboutPlaceholderDescription: 'A closer look at the philosophy, materials, and care behind every piece will be shared here.',
    },
    lang: { en: 'EN', fa: 'FA' },
    hero: {
      launchEdition: 'Launch edition',
      livePreview: 'Live preview',
      badge: 'New generation audio architecture',
      title: 'Sound that feels like light.',
      description: 'Sculpted for quiet luxury, engineered for clarity, and tuned to disappear into the room while elevating every moment.',
      discover: 'Discover the system',
      watch: 'Watch film',
      scroll: 'Scroll',
      scrollLabel: 'Scroll to experience',
      edition: 'Edition One',
      productTag: 'Crafted in studio',
      productDesc: 'Minimal silhouette / sculpted profile',
      year: '2026',
    },
    film: {
      label: 'Product film',
      heading: 'A cinematic introduction is coming here.',
      description: 'This section will host a short film that tells the product’s story, highlights its craftsmanship, and connects the scroll narrative to the feature showcase.',
      status: 'Video preview coming soon',
    },
    bridge: {
      whyItMatters: 'Why it matters',
      title: 'A smooth handoff from cinematic story to product showcase.',
      description: 'This section bridges the narrative and the featured collection with clear benefits and premium pacing, so the page feels curated and intentional instead of disconnected.',
      cards: {
        narrative: 'Narrative cohesion',
        narrativeDescription: 'The storytelling sequence now moves naturally into product discovery, preserving the page’s momentum and emotional build.',
        pacing: 'Intentional pacing',
        pacingDescription: 'Each section is designed to breathe, so the transition feels purposeful instead of abrupt or empty.',
        craftsmanship: 'Visible craftsmanship',
        craftsmanshipDescription: 'Subtle detail and material language reinforce the product’s premium sensibility before the feature showcase begins.',
        clarity: 'Product clarity',
        clarityDescription: 'The next section arrives with the right context, making the featured collection feel like a natural continuation.',
      },
    },
    featured: {
      exhibition: 'Featured exhibition',
      title: 'Objects made to feel rare.',
      description: 'A quiet exhibition of precision-crafted products, curated with generous pacing and sculptural presence.',
      showing: 'Showing {{count}} of {{total}} products',
    },
    filter: { all: 'All', ariaLabel: 'Product filters' },
    footer: {
      tagline: 'Designed for future experiences',
      heading: 'Minimal systems for bold interfaces.',
      body: 'A luxury layout framework prepared for future product surfaces, editorial storytelling, and premium commerce experiences.',
      join: 'Join the list',
      email: 'Email address',
      subscribe: 'Subscribe',
      northstar: 'Northstar',
      description: 'A refined layout foundation for premium digital products.',
      copyright: '© 2026 Northstar Atelier. All rights reserved.',
      social: { instagram: 'Instagram', x: 'X', web: 'Web' },
      columns: {
        studio: 'Studio',
        studioLinks: ['About', 'Craft', 'Journal', 'Careers'],
        products: 'Products',
        productsLinks: ['Platform', 'Experience', 'Systems', 'Services'],
        resources: 'Resources',
        resourcesLinks: ['Contact', 'Support', 'Privacy', 'Accessibility'],
      },
    },
    notFound: {
      title: 'Page not found',
      description: 'The route you requested does not exist. Return to the storefront home to continue.',
      goHome: 'Go home',
    },
    account: {
      title: 'Account',
      subtitle: 'Your personal luxury concierge',
      sidebar: {
        overview: 'Overview',
        profile: 'Profile',
        addresses: 'Addresses',
        orders: 'Orders',
        wishlist: 'Wishlist',
        settings: 'Settings',
      },
      header: {
        privateAccount: 'Private account',
        customerArea: 'Customer area',
        customerAreaSubtitle: 'Curated for your lifestyle.',
      },
      overview: {
        welcomeBack: 'Welcome back',
        loyalty: 'Loyalty level',
        orders: 'Total orders',
        spend: 'Total spent',
        wishlist: 'Wishlist count',
        cart: 'Cart items',
        address: 'Default address',
        recentOrders: 'Recent orders',
        quickActions: 'Quick actions',
        editProfile: 'Edit profile',
        addAddress: 'Add address',
        viewOrders: 'View orders',
        continueShopping: 'Continue shopping',
        viewAll: 'View all',
      },
      profile: {
        title: 'Profile',
        subtitle: 'Your personal details remain polished and easy to review.',
        avatarLabel: 'Profile photo',
        email: 'Email',
        phone: 'Phone',
        joined: 'Joined',
        editProfile: 'Edit profile',
      },
      addresses: {
        title: 'Addresses',
        subtitle: 'Manage your preferred delivery destinations with care.',
        addAddress: 'Add new address',
        edit: 'Edit',
        delete: 'Delete',
        default: 'Default',
        empty: 'No addresses saved yet.',
      },
      orders: {
        title: 'Orders',
        subtitle: 'Track your recent purchases and delivery progress.',
        orderCode: 'Order code',
        orderedOn: 'Ordered on',
        items: 'Items',
        total: 'Total',
        deliveryCity: 'Delivery city',
        status: 'Status',
        viewDetails: 'View details',
        empty: 'No orders yet.',
        statusText: {
          delivered: 'Delivered',
          processing: 'Processing',
          shipped: 'Shipped',
          cancelled: 'Cancelled',
        },
      },
      wishlist: {
        title: 'Wishlist',
        subtitle: 'Save your favourite pieces and revisit them later.',
        moveToCart: 'Move to cart',
        remove: 'Remove',
        empty: 'Your wishlist is empty.',
      },
      settings: {
        title: 'Settings',
        subtitle: 'Refine how your account feels and communicates.',
        password: 'Password',
        passwordDescription: 'Update your password to keep your account secure.',
        changePassword: 'Change password',
        notifications: 'Notifications',
        notificationsDescription: 'Control updates about new arrivals and restocks.',
        manageNotifications: 'Manage notifications',
        language: 'Language preference',
        languageDescription: 'Switch between English and Persian whenever you like.',
        privacy: 'Privacy',
        privacyDescription: 'Manage the visibility of your account details.',
        managePrivacy: 'Manage privacy',
        deleteAccount: 'Delete account',
        deleteAccountDescription: 'This action is reserved for future account management flows.',
        deleteAccountAction: 'Delete account',
      },
    },
    cart: {
      title: 'Shopping bag',
      subtitle: 'Your curated selection',
      description: 'Every detail is prepared for a calm and polished shopping experience.',
      emptyTitle: 'Your bag is ready for a first edit',
      emptyDescription: 'Add pieces you love and they will appear here.',
      priceSummary: 'Price summary',
      subtotal: 'Subtotal',
      discount: 'Discount',
      shipping: 'Shipping',
      tax: 'Tax',
      estimatedTotal: 'Estimated total',
      totalSaved: 'You saved {{amount}} with this selection.',
      itemsCount: '{{count}} items',
      unitPrice: 'Unit price',
      total: 'Total',
      remove: 'Remove',
      sku: 'SKU',
      checkout: 'Continue to checkout',
    },
    product: {
      addToCart: 'Add to cart',
      quickView: 'Quick view',
      addToWishlist: 'Add to wishlist',
      priceFrom: 'From {{price}}',
      exploreEdition: 'Explore the edition',
    },
    scroll: {
      ariaLabel: 'Premium scroll story',
      productInsight: 'Product insight',
      premiumNarrative: 'Premium narrative',
      title: 'A story that unfolds with every inch of scroll.',
      titleFinal: 'The object settles into stillness.',
      body: 'Light moves, depth deepens, and the form becomes unmistakable as the scroll progresses.',
      bodyFinal: 'Crafted for a slow reveal, the experience arrives with quiet confidence and cinematic elegance.',
    },
    errorBoundary: {
      title: 'Something went wrong',
      description: 'A critical error disrupted the experience. Please refresh and try again.',
    },
    designSystem: {
      layoutFoundation: 'Layout foundation',
      heading: 'A premium, reusable shell for luxury digital experiences.',
      body: 'This foundation introduces an elegant app structure for future storytelling, commerce, and editorial experiences without committing to page-specific content yet.',
      openSystem: 'Open system',
      exploreTokens: 'Explore tokens',
      colorFoundation: 'Color foundation',
      statusAccents: 'Status accents',
      typographyScale: 'Typography scale',
      displayXL: 'Display XL',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bodyLarge: 'Body large for supporting paragraphs and interface copy.',
      componentPrimitives: 'Component primitives',
      emailAddress: 'Email address',
      newLabel: 'New',
      designToken: 'Design token',
      accessibility: 'Accessibility',
      componentCopy: 'Spacing, radius, motion, and surface treatments are now ready for future component library work.',
    },
    labels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      province: 'Province',
      postalCode: 'Postal code',
    },
  },
  fa: {
    common: {
      save: 'ذخیره',
      cancel: 'لغو',
      edit: 'ویرایش',
      delete: 'حذف',
      add: 'افزودن',
      remove: 'حذف',
      continue: 'ادامه',
      back: 'بازگشت',
      close: 'بستن',
      loading: 'در حال بارگذاری',
      empty: 'هنوز موردی موجود نیست.',
      error: 'مشکلی رخ داد.',
      viewAll: 'مشاهده همه',
      viewDetails: 'مشاهده جزئیات',
      shopNow: 'خرید کنید',
      viewCart: 'مشاهده سبد',
      continueShopping: 'ادامه خرید',
      checkout: 'ادامه به پرداخت',
    },
    brand: { name: 'نورث‌استار', subtitle: 'آتلیه' },
    nav: {
      home: 'خانه',
      shop: 'فروشگاه',
      collections: 'کالکشن‌ها',
      newArrivals: 'جدیدترین‌ها',
      journal: 'ژورنال',
      about: 'درباره ما',
      shopNow: 'خرید کنید',
      viewCart: 'مشاهده سبد',
      search: 'جستجو',
      wishlist: 'علاقه‌مندی‌ها',
      account: 'حساب کاربری',
      cart: 'سبد خرید',
      toggleMenu: 'باز کردن منو',
      closeMenu: 'بستن منو',
      primaryNavigation: 'ناوبری اصلی',
      quickLinks: 'لینک‌های سریع',
      searchTitle: 'جستجو در مجموعه',
      searchPlaceholder: 'برای اقلام ضروری، لوازم جانبی و موارد بیشتر جستجو کنید',
      searchHint: 'به‌زودی یک تجربه جستجوی شیک و مدرن در اینجا راه‌اندازی می‌شود.',
      searchCta: 'اکنون کاوش کنید',
      placeholderBadge: 'به‌زودی',
      shopPlaceholderTitle: 'فروشگاه بوتیک به‌زودی باز می‌شود',
      shopPlaceholderDescription: 'یک تجربه خرید با کالای منتخب، لوازم جانبی ظریف و هدایا با طعم لوکس در حال آماده‌سازی است.',
      collectionsPlaceholderTitle: 'کالکشن‌ها با دقت انتخاب می‌شوند',
      collectionsPlaceholderDescription: 'کپسول‌های فصلی و داستان‌های شاخص برای زندگی مدرن با وضوح آرام ارائه می‌شوند.',
      arrivalsPlaceholderTitle: 'محصولات جدید در راه‌اند',
      arrivalsPlaceholderDescription: 'دست‌آورد بعدی به‌زودی با فرم‌های تازه و جزئیات دقیق برای هر فصل می‌رسد.',
      journalPlaceholderTitle: 'ژورنال در حال آماده‌سازی است',
      journalPlaceholderDescription: 'داستان‌های ویرایشی، یادداشت‌های سبک و پشت‌صحنه هنری به‌زودی اینجا منتشر می‌شوند.',
      aboutPlaceholderTitle: 'درباره خانه',
      aboutPlaceholderDescription: 'نگاهی نزدیک‌تر به فلسفه، متریال و مراقبت پشت هر قطعه در اینجا به اشتراک گذاشته می‌شود.',
    },
    lang: { en: 'EN', fa: 'فا' },
    hero: {
      launchEdition: 'نسخه پیش‌نمایش',
      livePreview: 'پیش‌نمایش زنده',
      badge: 'معماری صوتی نسل جدید',
      title: 'صوتی که مانند نور حس می‌شود.',
      description: 'برای لوکس بودن آرام طراحی شده، برای وضوح مهندسی شده، و طوری تنظیم شده که در فضا محو شود در حالی که هر لحظه را بالا می‌برد.',
      discover: 'کاوش در سیستم',
      watch: 'تماشای فیلم',
      scroll: 'اسکرول',
      scrollLabel: 'برو به تجربه',
      edition: 'نسخه اول',
      productTag: 'ساخته‌شده در آتلیه',
      productDesc: 'سیلوئت مینیمال / پروفایل مجسمه‌ای',
      year: '۲۰۲۶',
    },
    film: {
      label: 'فیلم محصول',
      heading: 'معرفی سینمایی در اینجا خواهد آمد.',
      description: 'این بخش میزبان فیلم کوتاهی خواهد بود که داستان محصول را روایت می‌کند، صنعتگری آن را برجسته می‌کند و روایت اسکرول را به نمایش ویژگی متصل می‌کند.',
      status: 'پیش‌نمایش ویدئو به زودی',
    },
    bridge: {
      whyItMatters: 'چرا اهمیت دارد',
      title: 'تحویل نرم از داستان سینمایی به نمایش محصول.',
      description: 'این بخش روایت را با مجموعه ویژه با مزایای واضح و ریتم پریمیوم پل می‌زند تا صفحه حس گزیده‌شده و هدفمند داشته باشد نه جداافتاده.',
      cards: {
        narrative: 'انسجام روایت',
        narrativeDescription: 'روند داستان‌گویی اکنون به طور طبیعی به کشف محصول منتقل می‌شود و شتاب صفحه و بار عاطفی را حفظ می‌کند.',
        pacing: 'ریتم حساب‌شده',
        pacingDescription: 'هر بخش به گونه‌ای طراحی شده تا نفس بکشد، تا انتقال هدفمند باشد نه ناگهانی یا خالی.',
        craftsmanship: 'صنعتگری محسوس',
        craftsmanshipDescription: 'جزئیات ظریف و زبان متریال حس پریمیوم محصول را پیش از شروع نمایش ویژه تقویت می‌کنند.',
        clarity: 'وضوح محصول',
        clarityDescription: 'بخش بعدی با زمینه مناسب می‌آید و مجموعه ویژه را به عنوان ادامه‌ای طبیعی احساس می‌کند.',
      },
    },
    featured: {
      exhibition: 'نمایش ویژه',
      title: 'اشیایی ساخته شده برای حس نادر بودن.',
      description: 'یک نمایش آرام از محصولات دقیق ساخته شده، با ریتم سخاوتمندانه و حضور مجسمه‌ای.',
      showing: 'نمایش {{count}} از {{total}} محصول',
    },
    filter: { all: 'همه', ariaLabel: 'فیلترهای محصول' },
    footer: {
      tagline: 'طراحی شده برای تجربه‌های آینده',
      heading: 'سامانه‌های مینیمال برای رابط‌های جسور.',
      body: 'چهارچوبی لوکس برای سطوح دیجیتال پریمیوم، روایت‌های ویرایشی و تجربه‌های تجارت ممتاز.',
      join: 'عضویت در خبرنامه',
      email: 'نشانی ایمیل',
      subscribe: 'عضویت',
      northstar: 'نورث‌استار',
      description: 'پایه‌ای تصفیه‌شده برای محصولات دیجیتال پریمیوم.',
      copyright: '© ۲۰۲۶ نورث‌استار آتلیه. تمامی حقوق محفوظ است.',
      social: { instagram: 'اینستاگرام', x: 'ایکس', web: 'وب' },
      columns: {
        studio: 'استودیو',
        studioLinks: ['درباره', 'کرفت', 'ژورنال', 'فرصت‌های شغلی'],
        products: 'محصولات',
        productsLinks: ['پلتفرم', 'تجربه', 'سامانه‌ها', 'خدمات'],
        resources: 'منابع',
        resourcesLinks: ['تماس', 'پشتیبانی', 'حریم خصوصی', 'دسترس‌پذیری'],
      },
    },
    notFound: {
      title: 'صفحه پیدا نشد',
      description: 'مسیر درخواستی وجود ندارد. به صفحه اصلی بازگردید.',
      goHome: 'بازگشت',
    },
    account: {
      title: 'حساب کاربری',
      subtitle: 'مرافق شخصی لوکس شما',
      sidebar: {
        overview: 'نمای کلی',
        profile: 'پروفایل',
        addresses: 'آدرس‌ها',
        orders: 'سفارش‌ها',
        wishlist: 'علاقه‌مندی‌ها',
        settings: 'تنظیمات',
      },
      header: {
        privateAccount: 'حساب خصوصی',
        customerArea: 'فضای مشتری',
        customerAreaSubtitle: 'برای سبک زندگی شما تنظیم شده است.',
      },
      overview: {
        welcomeBack: 'خوش برگشتی',
        loyalty: 'سطح مشتری',
        orders: 'تعداد سفارش‌ها',
        spend: 'مجموع خرید',
        wishlist: 'تعداد علاقه‌مندی‌ها',
        cart: 'آیتم‌های سبد خرید',
        address: 'آدرس پیش‌فرض',
        recentOrders: 'سفارش‌های اخیر',
        quickActions: 'اقدامات سریع',
        editProfile: 'ویرایش پروفایل',
        addAddress: 'افزودن آدرس',
        viewOrders: 'مشاهده سفارش‌ها',
        continueShopping: 'ادامه خرید',
        viewAll: 'مشاهده همه',
      },
      profile: {
        title: 'پروفایل شخصی',
        subtitle: 'جزئیات حساب شما خصوصی و شیک باقی می‌ماند.',
        avatarLabel: 'عکس پروفایل',
        email: 'ایمیل',
        phone: 'تلفن',
        joined: 'عضو از',
        editProfile: 'ویرایش پروفایل',
      },
      addresses: {
        title: 'آدرس‌های ذخیره‌شده',
        subtitle: 'مقاصد تحویل مورد علاقه خود را با دقت مدیریت کنید.',
        addAddress: 'افزودن آدرس',
        edit: 'ویرایش',
        delete: 'حذف',
        default: 'پیش‌فرض',
        empty: 'هنوز آدرسی ذخیره نشده است.',
      },
      orders: {
        title: 'تاریخچه سفارش',
        subtitle: 'آخرین خریدها و وضعیت تحویل را دنبال کنید.',
        orderCode: 'کد سفارش',
        orderedOn: 'سفارش داده شده در',
        items: 'آیتم',
        total: 'جمع',
        deliveryCity: 'شهر تحویل',
        status: 'وضعیت',
        viewDetails: 'مشاهده جزئیات',
        empty: 'هنوز سفارشی وجود ندارد.',
        statusText: {
          delivered: 'تحویل داده شده',
          processing: 'در حال پردازش',
          shipped: 'ارسال شده',
          cancelled: 'لغو شده',
        },
      },
      wishlist: {
        title: 'علاقه‌مندی‌ها',
        subtitle: 'قطعات مورد علاقه خود را کنار هم نگه دارید و آماده خرید کنید.',
        moveToCart: 'انتقال به سبد',
        remove: 'حذف',
        empty: 'لیست علاقه‌مندی شما خالی است.',
      },
      settings: {
        title: 'تنظیمات حساب',
        subtitle: 'نحوه تجربه و ارتباط حساب خود را سفارشی کنید.',
        password: 'رمز عبور',
        passwordDescription: 'برای حفظ امنیت حساب، رمز عبور خود را به‌روزرسانی کنید.',
        changePassword: 'تغییر رمز عبور',
        notifications: 'اعلان‌ها',
        notificationsDescription: 'اعلان‌های مرتبط با محصولات جدید و موجودی مجدد را کنترل کنید.',
        manageNotifications: 'مدیریت اعلان‌ها',
        language: 'تنظیم زبان',
        languageDescription: 'در هر زمان بین انگلیسی و فارسی جابه‌جا شوید.',
        privacy: 'حریم خصوصی',
        privacyDescription: 'قابلیت مشاهده جزئیات حساب خود را مدیریت کنید.',
        managePrivacy: 'مدیریت حریم خصوصی',
        deleteAccount: 'حذف حساب',
        deleteAccountDescription: 'این اقدام برای جریان‌های آینده مدیریت حساب در نظر گرفته شده است.',
        deleteAccountAction: 'حذف حساب',
      },
    },
    cart: {
      title: 'کیف خرید',
      subtitle: 'انتخاب شما',
      description: 'هر جزئیات برای یک تجربه خرید آرام و شیک آماده شده است.',
      emptyTitle: 'سبد شما آماده ویرایش است',
      emptyDescription: 'قطعات مورد علاقه خود را اضافه کنید و در اینجا ظاهر شوند.',
      priceSummary: 'خلاصه قیمت',
      subtotal: 'جمع جزء',
      discount: 'تخفیف',
      shipping: 'ارسال',
      tax: 'مالیات',
      estimatedTotal: 'جمع تقریبی',
      totalSaved: 'با این انتخاب {{amount}} صرفه‌جویی کرده‌اید.',
      itemsCount: '{{count}} آیتم',
      unitPrice: 'قیمت واحد',
      total: 'جمع',
      remove: 'حذف',
      sku: 'شناسه محصول',
      checkout: 'ادامه به پرداخت',
    },
    product: {
      addToCart: 'افزودن به سبد',
      quickView: 'مشاهده سریع',
      addToWishlist: 'افزودن به علاقه‌مندی',
      priceFrom: 'از {{price}}',
      exploreEdition: 'کاوش نسخه',
    },
    scroll: {
      ariaLabel: 'داستان اسکرول پریمیوم',
      productInsight: 'دید محصول',
      premiumNarrative: 'روایت پریمیوم',
      title: 'داستانی که با هر اینچ اسکرول باز می‌شود.',
      titleFinal: 'شیء در سکون قرار می‌گیرد.',
      body: 'نور حرکت می‌کند، عمق بیشتر می‌شود و فرم با پیشرفت اسکرول غیرقابل‌انکار می‌شود.',
      bodyFinal: 'برای رونمایی آرام ساخته شده، تجربه با اعتماد به نفس آرام و جلوه سینمایی می‌رسد.',
    },
    errorBoundary: {
      title: 'مشکلی رخ داد',
      description: 'یک خطای بحرانی تجربه را مختل کرد. لطفاً صفحه را تازه کنید و دوباره تلاش کنید.',
    },
    designSystem: {
      layoutFoundation: 'پایه چیدمان',
      heading: 'یک پوسته ممتاز و قابل استفاده مجدد برای تجربه‌های دیجیتال لوکس.',
      body: 'این پایه یک ساختار زیبا برای روایت داستان، تجارت و تجربه‌های ویراستاری آینده معرفی می‌کند بدون آنکه به محتوای صفحه خاصی متعهد شود.',
      openSystem: 'باز کردن سیستم',
      exploreTokens: 'کاوش توکن‌ها',
      colorFoundation: 'پایه رنگ',
      statusAccents: 'اکسنت‌های وضعیت',
      typographyScale: 'مقیاس تایپوگرافی',
      displayXL: 'نمایش XL',
      heading1: 'عنوان 1',
      heading2: 'عنوان 2',
      heading3: 'عنوان 3',
      bodyLarge: 'متن بلند برای پاراگراف‌های پشتیبان و متن رابط کاربری.',
      componentPrimitives: 'ابتدای مؤلفه',
      emailAddress: 'نشانی ایمیل',
      newLabel: 'جدید',
      designToken: 'توکن طراحی',
      accessibility: 'دسترس‌پذیری',
      componentCopy: 'فاصله، شعاع، حرکت و سطح‌ها اکنون آماده کارهای بعدی کتابخانه مؤلفه هستند.',
    },
    labels: {
      email: 'ایمیل',
      phone: 'تلفن',
      address: 'آدرس',
      city: 'شهر',
      province: 'استان',
      postalCode: 'کد پستی',
    },
  },
}

const LanguageContext = createContext<TranslationContextValue | null>(null)

function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let node: TranslationNode = translations[locale]

  for (const segment of keys) {
    if (typeof node !== 'object' || node === null || !(segment in node)) {
      return key
    }
    node = (node as Record<string, TranslationNode>)[segment]
  }

  return typeof node === 'string' ? node : key
}

function formatTranslation(text: string, params?: TranslationParams) {
  if (!params) return text
  return text.replace(/{{(\w+)}}/g, (_, token) => String(params[token] ?? ''))
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem('locale')
    return stored === 'fa' ? 'fa' : 'en'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  }, [locale])

  const value = useMemo<TranslationContextValue>(
    () => ({
      locale,
      dir: locale === 'fa' ? 'rtl' : 'ltr',
      isRtl: locale === 'fa',
      setLocale,
      t: (key: string, params?: TranslationParams) => formatTranslation(getTranslation(locale, key), params),
      formatPrice: (value: number) =>
        new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(value),
      formatDate: (value: string | Date) =>
        new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(value)),
      formatNumber: (value: number) => new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value),
      formatOrderStatus: (status: string) => {
        const statusKey = `account.orders.statusText.${status.toLowerCase()}`
        const localized = getTranslation(locale, statusKey)
        return localized === statusKey ? status : localized
      },
    }),
    [locale],
  )

  return createElement(LanguageContext.Provider, { value }, children)
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslation() {
  return useLanguage()
}
