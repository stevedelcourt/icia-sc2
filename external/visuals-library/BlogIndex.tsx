"use client";

import { useState, useMemo } from "react";
import styles from "./blog.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CategoryKey =
  | "all"
  | "strategie"
  | "ia"
  | "ingenierie"
  | "institutions"
  | "entreprises"
  | "international"
  | "cas";

export interface Category {
  key: CategoryKey;
  label: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<CategoryKey, "all">;
  date: string;
  /** ISO date string for sorting */
  dateISO: string;
  featured?: boolean;
  /** Arbitrary color index 1–9 for placeholder gradient */
  colorIndex?: number;
  /** Full image URL once you wire real assets */
  imageUrl?: string;
}

// ─── Static data (swap for API / CMS calls) ──────────────────────────────────

export const CATEGORIES: Category[] = [
  { key: "all", label: "À la une" },
  { key: "strategie", label: "Stratégie" },
  { key: "ia", label: "IA & Formation" },
  { key: "ingenierie", label: "Ingénierie pédagogique" },
  { key: "institutions", label: "Institutions" },
  { key: "entreprises", label: "Entreprises" },
  { key: "international", label: "International" },
  { key: "cas", label: "Études de cas" },
];

export const POSTS: Post[] = [
  {
    id: "1",
    slug: "creer-institution-enseignement-superieur",
    title:
      "Créer une institution d'enseignement supérieur de zéro\u00a0: les étapes que personne ne vous dit",
    excerpt:
      "Accréditations, ingénierie des maquettes pédagogiques, référencement Qualiopi, recrutement du corps professoral\u00a0: la liste est longue. Mentivis revient sur les 12 à 18 mois critiques qui précèdent l'ouverture.",
    category: "strategie",
    date: "8 mai 2026",
    dateISO: "2026-05-08",
    featured: true,
    colorIndex: 1,
  },
  {
    id: "2",
    slug: "opco-atlas-ia-generative-organismes-formation",
    title:
      "OPCO Atlas et l'IA générative\u00a0: ce que les organismes de formation doivent anticiper",
    excerpt:
      "Le cadre réglementaire bouge. Les critères d'évaluation Qualiopi évoluent. Les outils IA entrent dans les dispositifs. Ce que cela change concrètement pour les OF.",
    category: "ia",
    date: "2 mai 2026",
    dateISO: "2026-05-02",
    colorIndex: 2,
  },
  {
    id: "3",
    slug: "au-dela-du-powerpoint-grands-cabinets-implementation",
    title:
      "Au-delà du PowerPoint\u00a0: pourquoi les grands cabinets ratent l'implémentation",
    excerpt:
      "Livrable déposé, mission terminée. Ce modèle ne résiste plus à l'ère de l'IA. Analyse de la disruption des boutiques spécialisées face aux grands acteurs traditionnels.",
    category: "strategie",
    date: "24 avr. 2026",
    dateISO: "2026-04-24",
    colorIndex: 3,
  },
  {
    id: "4",
    slug: "la-boite-immo-campus-10000-professionnels",
    title:
      "La Boîte Immo Campus\u00a0: former 10\u202f000 professionnels sur dix ans",
    excerpt:
      "Retour sur la construction d'un réseau de formation immobilière hybride, entre écoles propres et franchises, avec une montée en charge progressive.",
    category: "cas",
    date: "15 avr. 2026",
    dateISO: "2026-04-15",
    colorIndex: 4,
  },
  {
    id: "5",
    slug: "modele-diplome-franco-etranger",
    title:
      "Le modèle diplôme franco-étranger\u00a0: mode d'emploi pour les universités partenaires",
    excerpt:
      "Étudiants qui étudient à l'étranger puis viennent en France pour valider un diplôme français. Structure juridique, partenariats, accréditations\u00a0: les modalités.",
    category: "international",
    date: "7 avr. 2026",
    dateISO: "2026-04-07",
    colorIndex: 5,
  },
  {
    id: "6",
    slug: "remuneration-variable-formation-aligner-interets",
    title:
      "Rémunération variable en formation\u00a0: aligner les intérêts entre opérateur et client",
    excerpt:
      "Un modèle où Mentivis est rémunéré sur les résultats, pas sur les livrables. Ce que cela implique pour la contractualisation et la relation client.",
    category: "entreprises",
    date: "29 mars 2026",
    dateISO: "2026-03-29",
    colorIndex: 6,
  },
  {
    id: "7",
    slug: "agents-generatifs-simulation-marche-education",
    title:
      "Agents génératifs et simulation de marché\u00a0: un nouveau terrain d'analyse en éducation",
    excerpt:
      "Comment utiliser des agents IA pour simuler des comportements de cohortes, tester des hypothèses de positionnement et anticiper les dynamiques d'un marché éducatif.",
    category: "ia",
    date: "18 mars 2026",
    dateISO: "2026-03-18",
    colorIndex: 7,
  },
  {
    id: "8",
    slug: "ingenierie-pedagogique-travail-realite",
    title:
      "L'ingénierie pédagogique au travail\u00a0: ce que les clients ne voient jamais",
    excerpt:
      "Séquençage des apprentissages, alignement constructif, évaluation formative\u00a0: les décisions invisibles qui déterminent si une formation tient sur la durée.",
    category: "ingenierie",
    date: "5 mars 2026",
    dateISO: "2026-03-05",
    colorIndex: 8,
  },
  {
    id: "9",
    slug: "transformer-une-universite-en-12-mois",
    title:
      "Transformer une université en 12 mois\u00a0: ce que la mission Mentivis a vraiment produit",
    excerpt:
      "Nouvelle offre de formation, refonte du système d'information pédagogique, recrutement d'une équipe de direction. Retour d'expérience sans filtre.",
    category: "institutions",
    date: "19 févr. 2026",
    dateISO: "2026-02-19",
    colorIndex: 9,
  },
];

const POSTS_PER_PAGE = 6;

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorBlock({
  index,
  className,
}: {
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`${styles.colorBlock} ${styles[`c${index ?? 1}`]} ${className ?? ""}`}
    />
  );
}

interface FeaturedCardProps {
  post: Post;
}

function FeaturedCard({ post }: FeaturedCardProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.key === post.category)?.label ?? post.category;

  return (
    <article className={styles.featured}>
      <div className={styles.featImg}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className={styles.featImgEl} />
        ) : (
          <ColorBlock index={post.colorIndex} className={styles.featImgEl} />
        )}
      </div>
      <div className={styles.featContent}>
        <div>
          <div className={styles.featMeta}>
            <span className={styles.badge}>{categoryLabel}</span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <h2
            className={styles.featTitle}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p className={styles.featExcerpt}>{post.excerpt}</p>
        </div>
        <a href={`/blog/${post.slug}`} className={styles.featCta}>
          Lire l&rsquo;article
        </a>
      </div>
    </article>
  );
}

interface ArticleCardProps {
  post: Post;
}

function ArticleCard({ post }: ArticleCardProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.key === post.category)?.label ?? post.category;

  return (
    <article className={styles.card}>
      <a href={`/blog/${post.slug}`} className={styles.cardLink}>
        <div className={styles.cardImg}>
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className={styles.cardImgEl} />
          ) : (
            <ColorBlock index={post.colorIndex} className={styles.cardImgEl} />
          )}
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.cardBadge}>{categoryLabel}</span>
          <span className={styles.date}>{post.date}</span>
        </div>
        <h3
          className={styles.cardTitle}
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <div className={styles.cardSep} />
      </a>
    </article>
  );
}

interface CategoryFilterProps {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <nav className={styles.cats} aria-label="Filtrer par catégorie">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`${styles.catPill} ${active === cat.key ? styles.catPillActive : ""}`}
          onClick={() => onChange(cat.key)}
          aria-pressed={active === cat.key}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1, 2);
    if (current > 4) pages.push("ellipsis");
    for (
      let i = Math.max(3, current - 1);
      i <= Math.min(total - 2, current + 1);
      i++
    )
      pages.push(i);
    if (current < total - 3) pages.push("ellipsis");
    pages.push(total - 1, total);
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`el-${idx}`} className={`${styles.pageBtn} ${styles.pageDots}`}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={`${styles.pageBtn} ${current === p ? styles.pageBtnActive : ""}`}
            onClick={() => onChange(p)}
            aria-current={current === p ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
    </nav>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

interface BlogIndexProps {
  /** Pass server-fetched posts to override the static sample data */
  initialPosts?: Post[];
}

export default function BlogIndex({ initialPosts }: BlogIndexProps) {
  const posts = initialPosts ?? POSTS;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost =
    activeCategory === "all"
      ? (filteredPosts.find((p) => p.featured) ?? filteredPosts[0])
      : filteredPosts[0];

  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const pagedPosts = gridPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  function handleCategoryChange(key: CategoryKey) {
    setActiveCategory(key);
    setPage(1);
  }

  return (
    <main className={styles.wrap}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Insights &amp;&nbsp;<em>points de vue</em>
        </h1>
      </header>

      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      {featuredPost && <FeaturedCard post={featuredPost} />}

      {pagedPosts.length > 0 && (
        <section>
          <p className={styles.sectionLabel}>Derniers articles</p>
          <div className={styles.grid}>
            {pagedPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <Pagination current={page} total={totalPages} onChange={setPage} />
    </main>
  );
}
