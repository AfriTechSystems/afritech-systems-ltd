export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-radial-glow">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
