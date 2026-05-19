'use client'

import { useState, useEffect } from 'react'

interface Article {
  slug: string
  title: string
  titleEn: string
  excerpt: string
  excerptEn: string
  body: string
  bodyEn: string
  category: string
  date: string
  image: string
}

const emptyArticle: Article = {
  slug: '', title: '', titleEn: '', excerpt: '', excerptEn: '',
  body: '', bodyEn: '', category: '', date: new Date().toISOString().split('T')[0], image: '',
}

export default function ActualitesAdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [editing, setEditing] = useState<Article | null>(null)
  const [mode, setMode] = useState<'list' | 'edit'>('list')
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  const slugify = (t: string) => t.toLowerCase()
    .replace(/[àâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  const handleImageUpload = async () => {
    if (!editing) return
    const input = document.createElement('input')
    input.type = 'file'; input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]; if (!file) return
      setUploading(true)
      const form = new FormData()
      form.append('file', file)
      form.append('slug', editing.slug || slugify(editing.title || 'article'))
      try {
        const res = await fetch('/api/admin/actualites/images/', { method: 'POST', body: form })
        const data = await res.json()
        if (data.success) {
          updateField('image', data.path)
          setStatus(`Uploadée: ${data.fileName}`)
        }
      } catch { setStatus('Erreur upload.') }
      setUploading(false)
    }
    input.click()
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/actualites/')
      const data = await res.json()
      setArticles(data.articles || [])
    } catch {}
  }

  const handleCreate = () => {
    setEditing({ ...emptyArticle, slug: '', date: new Date().toISOString().split('T')[0] })
    setMode('edit')
  }

  const handleEdit = (a: Article) => {
    setEditing({ ...a })
    setMode('edit')
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Supprimer cet article ?')) return
    try {
      await fetch(`/api/admin/actualites/?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
      setStatus('Article supprimé.')
      fetchArticles()
    } catch { setStatus('Erreur suppression.') }
  }

  const handleSave = async () => {
    if (!editing) return
    if (!editing.slug || !editing.title) {
      setStatus('Slug et titre requis.')
      return
    }
    try {
      const res = await fetch('/api/admin/actualites/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })
      if (res.ok) {
        setStatus('Article enregistré.')
        setMode('list')
        setEditing(null)
        fetchArticles()
      } else {
        setStatus('Erreur enregistrement.')
      }
    } catch { setStatus('Erreur réseau.') }
  }

  const updateField = (field: keyof Article, value: string) => {
    if (!editing) return
    setEditing({ ...editing, [field]: value })
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid #e5e5e5', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <html lang="fr">
      <body style={{ fontFamily: 'Inter, -apple-system, sans-serif', margin: 0, padding: 0, background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <a href="/admin" style={{ fontSize: '13px', color: '#4e4e4e', textDecoration: 'underline', marginBottom: '8px', display: 'block' }}>← Admin</a>
              <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#000', margin: 0 }}>Actualités</h1>
            </div>
            {mode === 'list' && (
              <button onClick={handleCreate} style={{
                padding: '10px 20px', background: '#000', color: '#fff', border: 'none',
                borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
              }}>
                Nouvel article
              </button>
            )}
          </div>

          {status && (
            <div style={{ background: status.includes('Erreur') ? '#fef2f2' : '#f0fdf4', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: status.includes('Erreur') ? '#991b1b' : '#166534' }}>
              {status}
            </div>
          )}

          {mode === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {articles.map(a => (
                <div key={a.slug} style={{
                  background: '#fff', borderRadius: '12px', padding: '16px 20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px',
                }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{a.category}</span>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: '4px 0 0' }}>{a.title}</p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '2px 0 0' }}>{a.date} · {a.slug}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(a)} style={{
                      padding: '6px 14px', border: '1px solid #e5e5e5', borderRadius: '6px',
                      background: '#fff', cursor: 'pointer', fontSize: '13px',
                    }}>Modifier</button>
                    <button onClick={() => handleDelete(a.slug)} style={{
                      padding: '6px 14px', border: '1px solid #fecaca', borderRadius: '6px',
                      background: '#fef2f2', color: '#991b1b', cursor: 'pointer', fontSize: '13px',
                    }}>Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {mode === 'edit' && editing && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Slug {editing?.slug && editing?.title && editing.slug === slugify(editing.title) ? '(auto)' : ''}</label>
                  <input value={editing.slug} onChange={e => updateField('slug', e.target.value)} style={fieldStyle} placeholder={editing?.title ? slugify(editing.title) : 'auto'} />
                </div>
                <div>
                  <label style={labelStyle}>Catégorie</label>
                  <input value={editing.category} onChange={e => updateField('category', e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={editing.date} onChange={e => updateField('date', e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Image</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input value={editing.image} onChange={e => updateField('image', e.target.value)} style={{ ...fieldStyle, flex: 1 }} placeholder="ex: /images/path.webp" />
                    <button onClick={handleImageUpload} disabled={uploading} style={{
                      padding: '8px 14px', border: '1px solid #e5e5e5', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap',
                    }}>{uploading ? '...' : '↥'}</button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                <div>
                  <label style={labelStyle}>Titre FR</label>
                  <input value={editing.title} onChange={e => { const v = e.target.value; if (editing && (!editing.slug || editing.slug === slugify(editing.title || ''))) { updateField('slug', slugify(v)) }; updateField('title', v) }} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Titre EN</label>
                  <input value={editing.titleEn} onChange={e => updateField('titleEn', e.target.value)} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Extrait FR</label>
                  <textarea value={editing.excerpt} onChange={e => updateField('excerpt', e.target.value)} rows={2} style={{ ...fieldStyle, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={labelStyle}>Extrait EN</label>
                  <textarea value={editing.excerptEn} onChange={e => updateField('excerptEn', e.target.value)} rows={2} style={{ ...fieldStyle, resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={labelStyle}>Contenu FR (Markdown)</label>
                  <button onClick={() => setPreview(!preview)} style={{
                    padding: '4px 12px', border: '1px solid #e5e5e5', borderRadius: '6px',
                    background: preview ? '#000' : '#fff', color: preview ? '#fff' : '#4e4e4e',
                    cursor: 'pointer', fontSize: '12px',
                  }}>
                    {preview ? 'Éditer' : 'Aperçu'}
                  </button>
                </div>
                {preview ? (
                  <div className="prose" style={{ background: '#f5f5f5', borderRadius: '8px', padding: '20px', minHeight: '200px', color: '#4e4e4e', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {editing.body}
                  </div>
                ) : (
                  <textarea value={editing.body} onChange={e => updateField('body', e.target.value)} rows={12} style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
                )}
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={labelStyle}>Contenu EN (Markdown)</label>
                <textarea value={editing.bodyEn} onChange={e => updateField('bodyEn', e.target.value)} rows={8} style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={handleSave} style={{
                  padding: '12px 24px', background: '#000', color: '#fff', border: 'none',
                  borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                }}>
                  Enregistrer
                </button>
                <button onClick={() => { setMode('list'); setEditing(null) }} style={{
                  padding: '12px 24px', border: '1px solid #e5e5e5', borderRadius: '8px',
                  background: '#fff', cursor: 'pointer', fontSize: '14px',
                }}>
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '12px', fontWeight: 500, color: '#4e4e4e', marginBottom: '4px' }
