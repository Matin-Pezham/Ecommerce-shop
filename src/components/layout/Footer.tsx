import { ArrowUpRight, Camera, Globe2, Send, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { useTranslation } from '@/i18n'

const footerColumns = [
  {
    titleKey: 'footer.columns.studio',
    links: ['footer.columns.studioLinks.0', 'footer.columns.studioLinks.1', 'footer.columns.studioLinks.2', 'footer.columns.studioLinks.3'],
  },
  {
    titleKey: 'footer.columns.products',
    links: ['footer.columns.productsLinks.0', 'footer.columns.productsLinks.1', 'footer.columns.productsLinks.2', 'footer.columns.productsLinks.3'],
  },
  {
    titleKey: 'footer.columns.resources',
    links: ['footer.columns.resourcesLinks.0', 'footer.columns.resourcesLinks.1', 'footer.columns.resourcesLinks.2', 'footer.columns.resourcesLinks.3'],
  },
]

const socialLinks = [
  { label: 'Instagram', icon: Camera },
  { label: 'X', icon: Send },
  { label: 'Web', icon: Globe2 },
]

function FooterInner() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <Section spacing="spacious">
        <Container>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-primary-soft)] px-3 py-1 text-sm font-medium text-[color:var(--color-primary)]">
                  <Sparkles size={14} />
                  {t('footer.tagline')}
                </div>
                <h2 className="ds-text-h2 text-[color:var(--color-text-primary)]">{t('footer.heading')}</h2>
                <p className="mt-3 ds-text-body-lg">{t('footer.body')}</p>
              </div>
              <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 sm:min-w-[300px]">
                <p className="ds-text-body-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-secondary)]">{t('footer.join')}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input className="ds-input" placeholder={t('footer.email')} aria-label={t('footer.email')} />
                  <button className="ds-button ds-button--primary rounded-full px-5 py-3" type="button">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[color:var(--color-border)] pt-8">
              <Grid columns={4} gap="md" className="items-start">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-secondary)]">{t('footer.northstar')}</p>
                  <p className="ds-text-body-sm">{t('footer.description')}</p>
                </div>
                {footerColumns.map((column) => (
                  <div key={column.titleKey} className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-secondary)]">{t(column.titleKey)}</p>
                    <ul className="space-y-2">
                      {column.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="ds-text-body-sm text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-primary)]">
                            {t(link)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Grid>

              <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-6 md:flex-row md:items-center md:justify-between">
                <p className="ds-text-body-sm text-[color:var(--color-text-secondary)]">{t('footer.copyright')}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map(({ label, icon: Icon }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={t(`footer.social.${label.toLowerCase()}`)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  )
}

export const Footer = memo(FooterInner)
