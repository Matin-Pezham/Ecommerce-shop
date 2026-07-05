import { useTranslation } from '@/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] transition ${
          locale === 'en'
            ? 'bg-[color:var(--color-primary)] text-white shadow-[0_10px_25px_rgba(59,130,246,0.2)]'
            : 'bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)]'
        }`}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('fa')}
        className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] transition ${
          locale === 'fa'
            ? 'bg-[color:var(--color-primary)] text-white shadow-[0_10px_25px_rgba(59,130,246,0.2)]'
            : 'bg-[color:var(--color-surface)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-primary-soft)]'
        }`}
      >
        {t('lang.fa')}
      </button>
    </div>
  )
}
