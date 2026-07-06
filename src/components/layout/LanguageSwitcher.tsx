import { useTranslation } from '@/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale, t, isRtl } = useTranslation()

  return (
    <div className={`flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 p-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition ${
          locale === 'en'
            ? 'btn-cta text-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]'
            : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-card)]'
        }`}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('fa')}
        className={`rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition ${
          locale === 'fa'
            ? 'btn-cta text-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]'
            : 'text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-card)]'
        }`}
      >
        {t('lang.fa')}
      </button>
    </div>
  )
}
