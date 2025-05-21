import { useLocation } from 'wouter'

export function NotFound() {
  const [loc] = useLocation()
  return (
    <div>
      notFound
      {` ${loc}`}
    </div>
  )
}
