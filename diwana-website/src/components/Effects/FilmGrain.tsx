interface FilmGrainProps {
  enabled: boolean
}

export default function FilmGrain({ enabled }: FilmGrainProps) {
  if (!enabled) return null
  return <div className="film-grain" aria-hidden="true" />
}
