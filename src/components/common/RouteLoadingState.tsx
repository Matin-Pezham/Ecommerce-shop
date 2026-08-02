import { Container } from '@/components/layout/Container'

export function RouteLoadingState() {
  return (
    <Container className="py-8 sm:py-10">
      <section className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-card)]/95 p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="h-4 w-28 animate-pulse rounded-full bg-[color:var(--color-surface)]" />
        <div className="mt-4 h-10 w-3/5 animate-pulse rounded-2xl bg-[color:var(--color-surface)]" />
        <div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-[color:var(--color-surface)]" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={`route-loading-${index}`} className="h-56 animate-pulse rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70" />
          ))}
        </div>
      </section>
    </Container>
  )
}