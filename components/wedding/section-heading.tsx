import { Reveal } from './reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignment}`}>
      <Reveal>
        <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold" />
          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">{eyebrow}</span>
          <span className="h-px w-8 bg-gold" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 font-serif text-4xl font-light text-foreground text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p
            className={`mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
