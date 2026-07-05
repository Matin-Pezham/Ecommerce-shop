import { createContext, createElement, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'

export type Locale = 'en' | 'fa'

type TranslationParams = Record<string, string | number>
type TranslationNode = string | Record<string, TranslationNode>

type TranslationContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  setLocale: (locale: Locale) => void
  t: (key: string, params?: TranslationParams) => string
}

const translations: Record<Locale, TranslationNode> = {
  en: {
    brand: {
      name: 'NORTHSTAR',
      subtitle: 'Atelier',
    },
    nav: {
      studio: 'Studio',
      craft: 'Craft',
      journal: 'Journal',
      about: 'About',
      bookCall: 'Book a call',
      toggleMenu: 'Toggle navigation menu',
      primaryNavigation: 'Primary navigation',
    },
    lang: {
      en: 'EN',
      fa: 'FA',
    },
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
    filter: {
      all: 'All',
      ariaLabel: 'Product filters',
    },
    categories: {
      New: 'New',
      Popular: 'Popular',
      Gaming: 'Gaming',
      Audio: 'Audio',
      Accessories: 'Accessories',
      'Smart Home': 'Smart Home',
    },
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
      social: {
        instagram: 'Instagram',
        x: 'X',
        web: 'Web',
      },
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
    product: {
      addToCart: 'Add to Cart',
      quickView: 'Quick View',
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
    scrollPhases: {
      'phase-1': {
        title: 'Soft presence appears first',
        description: 'A subtle edge and warm highlight begin to hint at the product’s premium character.',
      },
      'phase-2': {
        title: 'Volume gains definition',
        description: 'The silhouette sharpens, surfaces reveal texture, and the object feels more real.',
      },
      'phase-3': {
        title: 'Details sharpen into view',
        description: 'Refined lines, premium finishes, and balanced form emerge with every move.',
      },
      'phase-4': {
        title: 'The design arrives complete',
        description: 'The full expression lands confidently, leaving no doubt about its crafted intent.',
      },
    },
    products: {
      'aurora-one': {
        title: 'Aurora One',
        description: 'Precision sound, sculpted silence, and immaculate clarity.',
        imageLabel: 'Premium audio device',
      },
      'lumen-frame': {
        title: 'Lumen Frame',
        description: 'A luminous display crafted for calm, cinematic focus.',
        imageLabel: 'Minimal display frame',
      },
      'nocturne-pad': {
        title: 'Nocturne Pad',
        description: 'Fluid control for immersive work and play.',
        imageLabel: 'Compact gaming controller',
      },
      'halo-remote': {
        title: 'Halo Remote',
        description: 'Quiet automation designed for refined everyday rituals.',
        imageLabel: 'Minimal smart remote',
      },
    },
  },
  fa: {
    brand: {
      name: 'نورث‌استار',
      subtitle: 'آتلیه',
    },
    nav: {
      studio: 'استودیو',
      craft: 'کرفت',
      journal: 'ژورنال',
      about: 'درباره',
      bookCall: 'رزرو تماس',
      toggleMenu: 'باز کردن منو',
      primaryNavigation: 'ناوبری اصلی',
    },
    lang: {
      en: 'EN',
      fa: 'فا',
    },
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
    filter: {
      all: 'همه',
      ariaLabel: 'فیلترهای محصول',
    },
    categories: {
      New: 'جدید',
      Popular: 'محبوب',
      Gaming: 'گیمینگ',
      Audio: 'صدا',
      Accessories: 'لوازم جانبی',
      'Smart Home': 'خانه هوشمند',
    },
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
      social: {
        instagram: 'اینستاگرام',
        x: 'ایکس',
        web: 'وب',
      },
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
    product: {
      addToCart: 'افزودن به سبد',
      quickView: 'نمایش سریع',
      addToWishlist: 'افزودن به لیست علاقه‌مندی',
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
    scrollPhases: {
      'phase-1': {
        title: 'نخست حضور نرم ظاهر می‌شود',
        description: 'لبه‌ای ملایم و یک برجستگی گرم شروع به اشاره به شخصیت پریمیوم محصول می‌کند.',
      },
      'phase-2': {
        title: 'حجم با تعریف پیدا می‌کند',
        description: 'سیلوئت تیزتر می‌شود، سطوح بافت را نشان می‌دهند و شکل واقعی‌تر به نظر می‌رسد.',
      },
      'phase-3': {
        title: 'جزئیات به دید می‌رسند',
        description: 'خطوط تصفیه‌شده، پرداخت‌های پریمیوم و فرم متعادل با هر حرکت آشکار می‌شوند.',
      },
      'phase-4': {
        title: 'طراحی کامل می‌شود',
        description: 'بیان کامل با اعتماد به نفس فرود می‌آید و هیچ شکی درباره نیت سازنده باقی نمی‌گذارد.',
      },
    },
    products: {
      'aurora-one': {
        title: 'Aurora One',
        description: 'صدای دقیق، سکوت شکل‌گرفته و وضوح بی‌نقص.',
        imageLabel: 'دستگاه صوتی پریمیوم',
      },
      'lumen-frame': {
        title: 'Lumen Frame',
        description: 'یک نمایش روشن که برای تمرکز سینمایی آرام طراحی شده است.',
        imageLabel: 'قاب نمایش مینیمال',
      },
      'nocturne-pad': {
        title: 'Nocturne Pad',
        description: 'کنترل سیال برای کار و بازی درگیرکننده.',
        imageLabel: 'کنترلر بازی جمع‌وجور',
      },
      'halo-remote': {
        title: 'Halo Remote',
        description: 'اتوماسیون آرام طراحی شده برای آیین‌های روزانه تصفیه‌شده.',
        imageLabel: 'ریموت هوشمند مینیمال',
      },
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

  const value = useMemo(
    () => ({
      locale,
      dir: locale === 'fa' ? 'rtl' : 'ltr',
      isRtl: locale === 'fa',
      setLocale,
      t: (key: string, params?: TranslationParams) => formatTranslation(getTranslation(locale, key), params),
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
