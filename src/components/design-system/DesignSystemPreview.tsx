import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { useTranslation } from '@/i18n'

const swatches = [
  { name: 'Primary', value: 'var(--color-primary)' },
  { name: 'Secondary', value: 'var(--color-secondary)' },
  { name: 'Accent', value: 'var(--color-accent)' },
  { name: 'Surface', value: 'var(--color-surface)' },
  { name: 'Card', value: 'var(--color-card)' },
  { name: 'Text', value: 'var(--color-text-primary)' },
]

const statusTokens = [
  { name: 'Success', value: 'var(--color-success)' },
  { name: 'Warning', value: 'var(--color-warning)' },
  { name: 'Error', value: 'var(--color-error)' },
  { name: 'Info', value: 'var(--color-info)' },
]

export function DesignSystemPreview() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <Section spacing="spacious" background="soft">
        <Container>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
            <div className="max-w-3xl space-y-6">
              <div className="ds-badge" style={{ width: 'fit-content' }}>
                <Sparkles size={12} />
                {t('designSystem.layoutFoundation')}
              </div>
              <h1 className="ds-text-display-l">{t('designSystem.heading')}</h1>
              <p className="ds-text-body-lg">{t('designSystem.body')}</p>
              <div className="ds-row-wrap">
                <button className="ds-button ds-button--primary">{t('designSystem.openSystem')}</button>
                <button className="ds-button ds-button--secondary">{t('designSystem.exploreTokens')} <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid columns={2} gap="lg">
            <div className="ds-card p-6">
              <h2 className="ds-text-h3 mb-4">{t('designSystem.colorFoundation')}</h2>
              <div className="space-y-3">
                {swatches.map((swatch) => (
                  <div key={swatch.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '1rem', height: '1rem', borderRadius: '999px', background: swatch.value, border: '1px solid var(--color-border)' }} />
                      <span className="ds-text-body-sm">{swatch.name}</span>
                    </div>
                    <span className="ds-text-caption">{swatch.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card p-6">
              <h2 className="ds-text-h3 mb-4">{t('designSystem.statusAccents')}</h2>
              <div className="space-y-3">
                {statusTokens.map((token) => (
                  <div key={token.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '1rem', height: '1rem', borderRadius: '999px', background: token.value }} />
                      <span className="ds-text-body-sm">{token.name}</span>
                    </div>
                    <span className="ds-text-caption">{token.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid columns={2} gap="lg">
            <div className="ds-card p-6">
              <h2 className="ds-text-h3 mb-4">{t('designSystem.typographyScale')}</h2>
              <div className="space-y-3">
                <div className="ds-text-display-xl">{t('designSystem.displayXL')}</div>
                <div className="ds-text-h1">{t('designSystem.heading1')}</div>
                <div className="ds-text-h2">{t('designSystem.heading2')}</div>
                <div className="ds-text-h3">{t('designSystem.heading3')}</div>
                <div className="ds-text-body-lg">{t('designSystem.bodyLarge')}</div>
              </div>
            </div>

            <div className="ds-card p-6">
              <h2 className="ds-text-h3 mb-4">Component primitives</h2>
              <div className="space-y-4">
                <input className="ds-input" placeholder={t('designSystem.emailAddress')} />
                <div className="ds-row-wrap">
                  <span className="ds-badge">{t('designSystem.newLabel')}</span>
                  <span className="ds-tag">{t('designSystem.designToken')}</span>
                  <span className="ds-tag">{t('designSystem.accessibility')}</span>
                </div>
                <div className="ds-surface p-4" style={{ borderRadius: 'var(--radius-md)' }}>
                  <p className="ds-text-body-sm">{t('designSystem.componentCopy')}</p>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>
    </div>
  )
}
