'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '48px', fontFamily: 'Inter, sans-serif' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '16px' }}>Une erreur est survenue</h2>
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 20px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 500,
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
