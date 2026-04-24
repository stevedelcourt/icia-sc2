# ICIA - Institut Collectif de l'IA

Site web institutionnel basé sur Next.js 14 avec design Anthropic.

## Déploiement Vercel + CMS

### 1. Déployer sur Vercel
```bash
npm install -g vercel
vercel
```

### 2. Configurer Git Gateway
1. Aller sur vercel.com > projet > Settings > Git
2. Activer "Git Gateway"
3. Ajouter les permissions de commit

### 3. Accéder à l'admin
- URL: `https://icia.fr/admin`
- Pour l'authentification, Vercel demandera de se connecter via GitHub/GitLab

### 4. Backend CMS
Le CMS utilise git-gateway - les modifications sont sauvegardées directement dans le repo Git.

## Structure

```
/app              - Pages Next.js
/components       - Composants React
/public/images    - Images
/public/admin     - Admin CMS
/content          - Contenu Markdown (futur)
```

## Commandes

```bash
npm run dev      # Développement local
npm run build    # Production
npm run start   # Server production
```
