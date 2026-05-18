'use client'

import { useState } from 'react'

export default function AdminPage() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'Inter, -apple-system, sans-serif', margin: 0, padding: 0, background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '8px' }}>ICIA Admin</h1>
          <p style={{ fontSize: '14px', color: '#4e4e4e', marginBottom: '32px' }}>
            Gestion locale du contenu. Non accessible en production.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            <a href="/admin/actualites" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '28px',
                boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px',
                transition: 'transform 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
              >
                <h2 style={{ fontSize: '17px', fontWeight: 500, color: '#000', marginBottom: '6px' }}>Actualités</h2>
                <p style={{ fontSize: '13px', color: '#4e4e4e', margin: 0 }}>Créer, modifier et supprimer des articles d'actualité.</p>
              </div>
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
