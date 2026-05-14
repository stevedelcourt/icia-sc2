export function ScrollExpandSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full py-16">
      <div
        className="w-full overflow-hidden rounded-card"
        style={{
          backgroundColor: '#3886c1',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 md:py-16 scroll-expand-content">
          {children}
        </div>
      </div>
    </section>
  )
}
