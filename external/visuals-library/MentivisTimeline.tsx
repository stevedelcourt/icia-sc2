import { useState } from "react";

interface TimelineEvent {
  title: string;
  desc: string;
  date: string;
}

const EVENTS: TimelineEvent[] = [
  {
    title: "Création de Mentivis",
    desc: "Fondation à Marseille d'un cabinet full-stack d'ingénierie pédagogique et de stratégie éducative.",
    date: "2019",
  },
  {
    title: "Premiers contrats institutionnels",
    desc: "Déploiement de projets de formation pour des ministères, grandes entreprises et organismes certificateurs.",
    date: "2020",
  },
  {
    title: "Modèle diplôme international",
    desc: "Développement du cursus binational : parcours à l'étranger, finalisation et diplôme en France.",
    date: "2021",
  },
  {
    title: "La Boîte Immo Campus",
    desc: "Lancement du réseau national de formation immobilière, combinant écoles propres et réseau de franchises sur dix ans.",
    date: "2022",
  },
  {
    title: "Institut de l'IA by Mentivis",
    desc: "Création d'une offre intégrée de formation aux métiers et usages de l'intelligence artificielle.",
    date: "2023",
  },
  {
    title: "OPCO Atlas – IA Générative",
    desc: "Réponse à appel d'offre sur l'impact de l'IA générative dans la formation professionnelle et l'évaluation.",
    date: "2024",
  },
  {
    title: "Marius IA",
    desc: "Lancement du pôle IA appliqué : agents génératifs de recherche de marché et simulations sociétales.",
    date: "2024",
  },
  {
    title: "Expansion internationale",
    desc: "Déploiement de l'ingénierie pédagogique Mentivis sur les marchés africains, moyen-orientaux et européens.",
    date: "2025",
  },
];

const N = EVENTS.length;

const TICK_BG =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 9 9\'%3E%3Crect width=\'0.5\' height=\'9\' fill=\'%231A1616\' opacity=\'0.15\'/%3E%3Crect width=\'0.5\' x=\'8.5\' height=\'9\' fill=\'%231A1616\' opacity=\'0.15\'/%3E%3C/svg%3E") center top / 9px 9px';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Outfit:wght@300;400;500&display=swap');

.mv-root {
  width: 100%;
  box-sizing: border-box;
}

.mv-card {
  background: #f5f3f1;
  border-radius: 24px;
  padding: 3.25rem 2rem 2.75rem;
  min-height: 27rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
  box-shadow: inset 0 0 0 0.5px rgba(26,22,22,0.1);
  font-family: 'Outfit', sans-serif;
}

.mv-above {
  text-align: center;
  min-height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mv-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1A1616;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.mv-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 50rem;
}

.mv-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(26,22,22,0.08), 0 1px 2px rgba(26,22,22,0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1A1616;
  transition: background 180ms ease, color 180ms ease, opacity 180ms ease;
}

.mv-btn:disabled {
  opacity: 0.25;
  cursor: default;
}

.mv-btn:not(:disabled):hover {
  background: #1A1616;
  color: #f5f3f1;
}

.mv-bar {
  flex: 1;
  position: relative;
  height: 9px;
  overflow: visible;
}

.mv-ticks {
  position: absolute;
  inset: 0;
}

.mv-marker {
  position: absolute;
  top: 50%;
  width: 1px;
  height: 9px;
  margin-top: -4.5px;
  background: #1A1616;
  border: none;
  padding: 0;
  cursor: pointer;
  transform-origin: center center;
  transform: translateX(-50%) scaleY(1);
  opacity: 0.3;
  transition: transform 340ms cubic-bezier(0.34, 1.18, 0.64, 1), opacity 220ms ease;
}

.mv-marker:hover:not(.mv-active) {
  opacity: 0.65;
  transform: translateX(-50%) scaleY(3);
}

.mv-active {
  opacity: 1;
  cursor: default;
  transform: translateX(-50%) scaleY(14);
}

.mv-below {
  text-align: center;
  max-width: 32rem;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.mv-desc {
  font-size: 0.82rem;
  font-weight: 300;
  color: #1A1616;
  line-height: 1.65;
  margin: 0 0 0.65rem;
}

.mv-date {
  font-size: 0.68rem;
  font-weight: 500;
  color: #8A7D70;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
}
`;

export default function MentivisTimeline(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  const navigate = (delta: number): void => {
    const next = current + delta;
    if (next < 0 || next >= N) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(next);
      setFade(true);
    }, 160);
  };

  const jumpTo = (i: number): void => {
    if (i === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(i);
      setFade(true);
    }, 160);
  };

  const aboveStyle: React.CSSProperties = {
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0)" : "translateY(-5px)",
    transition: "opacity 160ms ease, transform 160ms ease",
  };

  const belowStyle: React.CSSProperties = {
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0)" : "translateY(5px)",
    transition: "opacity 160ms ease, transform 160ms ease",
  };

  return (
    <>
      <style>{css}</style>
      <div className="mv-root">
        <div className="mv-card">

          <div className="mv-above" style={aboveStyle}>
            <h3 className="mv-title">{EVENTS[current].title}</h3>
          </div>

          <div className="mv-row">
            <button
              className="mv-btn"
              onClick={() => navigate(-1)}
              disabled={current === 0}
              aria-label="Précédent"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" strokeWidth="1.5" d="M10 4 6 8l4 4" />
              </svg>
            </button>

            <div className="mv-bar">
              <div
                className="mv-ticks"
                style={{ background: TICK_BG }}
              />
              {EVENTS.map((e: TimelineEvent, i: number) => (
                <button
                  key={i}
                  className={`mv-marker${i === current ? " mv-active" : ""}`}
                  style={{ left: `${(i / (N - 1)) * 100}%` }}
                  onClick={() => jumpTo(i)}
                  aria-label={`${e.title}, ${e.date}`}
                />
              ))}
            </div>

            <button
              className="mv-btn"
              onClick={() => navigate(1)}
              disabled={current === N - 1}
              aria-label="Suivant"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" strokeWidth="1.5" d="m6 12 4-4-4-4" />
              </svg>
            </button>
          </div>

          <div className="mv-below" style={belowStyle}>
            <p className="mv-desc">{EVENTS[current].desc}</p>
            <p className="mv-date">{EVENTS[current].date}</p>
          </div>

        </div>
      </div>
    </>
  );
}
