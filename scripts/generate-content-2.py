import json

content = {
  # Acteurs shared
  "acteurs.nav.entreprises": "Entreprises",
  "acteurs.nav.professions_liberales": "Professions libérales",
  "acteurs.nav.ecoles": "Écoles, CFA, Universités",
  "acteurs.nav.creatifs": "Industries créatives",
  "acteurs.nav.collectivites": "Collectivités et administrations",
  "acteurs.nav.grand_public": "Grand public",
  "acteurs.shared.label": "Pour qui ?",
  "acteurs.shared.cta": "Contactez-nous",
  "acteurs.shared.approche_title": "Notre approche",
  "acteurs.shared.axes_title": "Axes d'accompagnement",

  # Entreprises
  "acteurs.entreprises.title": "PME / ETI",
  "acteurs.entreprises.hero": "L'AI Act entre en vigueur en août 2026. Mais ce n'est pas la seule raison d'agir. Vos concurrents avancent, vos collaborateurs improvisent, et les décisions que vous prenez aujourd'hui sur l'IA conditionneront votre position dans deux ans. Autant les prendre avec méthode.",
  "acteurs.entreprises.approche.1.title": "Diagnostic IA et AI Act",
  "acteurs.entreprises.approche.1.desc": "Avant de transformer quoi que ce soit, comprendre où vous en êtes. Cartographie des usages réels, analyse des risques réglementaires, feuille de route sur 12 mois. Concret, pas théorique.",
  "acteurs.entreprises.approche.2.title": "Formations et acculturation",
  "acteurs.entreprises.approche.2.desc": "Vos équipes utilisent déjà l'IA, souvent sans vous le dire et parfois sans les bons réflexes. On fait en sorte qu'elles le fassent bien, dans un cadre sécurisé et adapté à vos métiers.",
  "acteurs.entreprises.approche.3.title": "Transformation IA",
  "acteurs.entreprises.approche.3.desc": "Passer de l'expérimentation dispersée à une pratique quotidienne cohérente. Gouvernance, montée en compétences, gestion du changement : on vous accompagne sur la durée, pas seulement sur le lancement.",
  "acteurs.entreprises.approche.4.title": "Partenaire support long terme",
  "acteurs.entreprises.approche.4.desc": "Les questions sur l'IA ne s'arrêtent pas après une mission. Nous restons disponibles pour vous aider à décider, en continu, sans conflit d'intérêt avec un éditeur ou un intégrateur.",
  "acteurs.entreprises.en_savoir_plus": "En savoir plus",

  # Professions libérales
  "acteurs.professions_liberales.title": "Professions libérales",
  "acteurs.professions_liberales.hero": "Votre expertise n'est pas remplaçable. Mais elle va changer de forme. L'IA entre dans le droit, la médecine, la comptabilité et l'architecture avec une vitesse que peu de cabinets ont anticipée. Comprendre ce qui relève de l'outil, ce qui relève de votre responsabilité, et ce que vous pouvez déléguer sans risque : c'est exactement ce dont vous avez besoin pour décider en confiance.",
  "acteurs.professions_liberales.axes.1.title": "Veille réglementaire",
  "acteurs.professions_liberales.axes.1.desc": "L'AI Act et les professions réglementées : comprendre ce qui change concrètement pour votre activité, vos clients et vos responsabilités.",
  "acteurs.professions_liberales.axes.2.title": "Sécurité des données",
  "acteurs.professions_liberales.axes.2.desc": "Confidentialité des dossiers clients, RGPD, IA et secret professionnel. Quelles sont les obligations et les bonnes pratiques quand l'IA entre dans votre cabinet.",
  "acteurs.professions_liberales.axes.3.title": "Outils IA adaptés",
  "acteurs.professions_liberales.axes.3.desc": "Sélectionner les outils IA qui correspondent vraiment à votre pratique sans dépendre d'un éditeur ou d'un intégrateur. Gain de temps réel, sans compromettre la qualité.",
  "acteurs.professions_liberales.axes.4.title": "Délégation et responsabilité",
  "acteurs.professions_liberales.axes.4.desc": "Ce que vous pouvez déléguer à l'IA sans risque, ce qui relève de votre expertise exclusive, et comment documenter vos processus pour rester maître de vos décisions.",
  "acteurs.professions_liberales.axes.5.title": "Communication client",
  "acteurs.professions_liberales.axes.5.desc": "Expliquer l'IA à vos clients, les rassurer, les informer. Un enjeu de confiance et de transparence qui devient un avantage compétitif.",
  "acteurs.professions_liberales.axes.6.title": "Formation continue",
  "acteurs.professions_liberales.axes.6.desc": "Programmes adaptés aux professions réglementées, avec mise à jour régulière selon l'évolution réglementaire et technologique.",

  # Écoles
  "acteurs.ecoles.title": "Écoles, CFA, Universités",
  "acteurs.ecoles.hero": "Vos étudiants utilisent déjà l'IA. Sans méthode, sans cadre, parfois sans savoir ce qu'ils font. Rendre vos cursus pertinents dans un monde qui a changé, c'est un enjeu de fond. Nous vous accompagnons sur le fond et sur la forme.",
  "acteurs.ecoles.axes.1.title": "Bibliothèque pédagogique",
  "acteurs.ecoles.axes.1.desc": "Des ressources libres d'accès, construites pour être utilisées directement en cours, à tous les niveaux d'enseignement et dans toutes les disciplines.",
  "acteurs.ecoles.axes.2.title": "Création de filière",
  "acteurs.ecoles.axes.2.desc": "Certains métiers n'existaient pas il y a trois ans. D'autres ont profondément changé. On vous aide à construire des parcours qui préparent vraiment à ce qui attend vos étudiants.",
  "acteurs.ecoles.axes.3.title": "Formation des formateurs",
  "acteurs.ecoles.axes.3.desc": "Avant d'enseigner l'IA, il faut la comprendre. On accompagne vos équipes pédagogiques avec une approche adaptée à leur contexte, sans les noyer dans la technique.",
  "acteurs.ecoles.axes.4.title": "Certifications",
  "acteurs.ecoles.axes.4.desc": "Des certifications reconnues par les employeurs, pour que la maîtrise de l'IA par vos étudiants devienne un atout visible sur le marché du travail.",
  "acteurs.ecoles.axes.5.title": "Développement",
  "acteurs.ecoles.axes.5.desc": "Structurer une offre de formation en IA prend du temps et demande de la méthode. On vous accompagne dans la durée, pas seulement au lancement.",
  "acteurs.ecoles.axes.6.title": "Accréditation institutionnelle",
  "acteurs.ecoles.axes.6.desc": "Conseil et accompagnement pour les démarches d'accréditation et de labellisation de vos formations IA auprès des autorités compétentes.",

  # Industries créatives
  "acteurs.creatifs.title": "Industries créatives",
  "acteurs.creatifs.hero": "L'IA bouleverse la création. Nouveaux outils, nouveaux workflows, nouvelles questions sur l'auteur et le droit. Savoir ce que l'IA peut faire pour vous — et ce qu'elle ne peut pas — devient un enjeu stratégique. On vous aide à y voir clair sans vous vendre de solution clé en main.",
  "acteurs.creatifs.secteurs_title": "Secteurs couverts",
  "acteurs.creatifs.secteurs.1": "Musique",
  "acteurs.creatifs.secteurs.2": "Arts visuels",
  "acteurs.creatifs.secteurs.3": "Cinéma",
  "acteurs.creatifs.secteurs.4": "Jeux vidéo",
  "acteurs.creatifs.secteurs.5": "Édition",
  "acteurs.creatifs.secteurs.6": "Architecture",
  "acteurs.creatifs.axes.1.title": "Ateliers créatifs IA",
  "acteurs.creatifs.axes.1.desc": "Explorer les outils de génération dans votre discipline, avec du recul. Pas pour tout utiliser : pour savoir ce que vous voulez vraiment en faire.",
  "acteurs.creatifs.axes.2.title": "Sécurité juridique",
  "acteurs.creatifs.axes.2.desc": "Droits d'auteur, formation des modèles sur vos œuvres, contrats avec les plateformes : le cadre légal évolue. On vous aide à le comprendre et à vous y positionner.",
  "acteurs.creatifs.axes.3.title": "Laboratoire d'innovation",
  "acteurs.creatifs.axes.3.desc": "Un espace pour tester, expérimenter, rater proprement. Sans pression commerciale, sans obligation de résultat immédiat.",
  "acteurs.creatifs.axes.4.title": "Monétisation",
  "acteurs.creatifs.axes.4.desc": "Comment intégrer l'IA dans votre chaîne de valeur sans dévalorisier votre travail. Nouveaux modèles économiques, nouveaux formats, nouveaux marchés.",

  # Collectivités
  "acteurs.collectivites.title": "Collectivités et administrations",
  "acteurs.collectivites.hero": "L'IA entre dans les services publics. Parfois par choix, parfois par obligation, souvent sans cadre suffisant. Ce qui est en jeu, c'est l'équité d'accès, la confiance des citoyens, et la capacité de vos agents à travailler autrement. Ça mérite une approche sérieuse, indépendante des vendeurs de solutions.",
  "acteurs.collectivites.programmes.1.title": "Inclusion numérique",
  "acteurs.collectivites.programmes.1.desc": "Une partie de vos administrés sera laissée de côté si personne ne s'en préoccupe activement. On vous aide à construire des dispositifs qui réduisent la fracture plutôt qu'à l'aggraver.",
  "acteurs.collectivites.programmes.2.title": "Transformation des services publics",
  "acteurs.collectivites.programmes.2.desc": "Identifier les cas d'usage pertinents, évaluer les risques, prioriser ce qui améliore vraiment le service rendu. Ni résistance ni adoption aveugle : une démarche structurée.",
  "acteurs.collectivites.programmes.3.title": "Remobilisation professionnelle",
  "acteurs.collectivites.programmes.3.desc": "Les agents publics sont en première ligne des changements induits par l'IA. Les accompagner, c'est aussi éviter que la transformation se fasse contre eux.",
  "acteurs.collectivites.programmes.4.title": "Observatoire territorial",
  "acteurs.collectivites.programmes.4.desc": "Piloter une politique IA sur un territoire, ça suppose de voir ce qui se passe vraiment. On vous donne les outils pour suivre l'adoption, mesurer les effets et ajuster.",

  # Grand public
  "acteurs.grand_public.title": "Grand public",
  "acteurs.grand_public.hero": "La fracture IA s'agrandit. Ceux qui maîtrisent les outils avancent. Ceux qui ne les comprennent pas subissent. Nous proposons des ateliers accessibles, sans prérequis techniques, pour que chacun puisse comprendre ce qui change et agir en connaissance de cause.",
  "acteurs.grand_public.cta": "Être accompagné",
  "acteurs.grand_public.axes.1.title": "Acculturation à l'IA",
  "acteurs.grand_public.axes.1.desc": "Des ateliers concrets pour comprendre ce qu'est vraiment l'IA, ce qu'elle peut faire pour vous, et ce qu'elle ne fait pas aussi bien qu'on le dit.",
  "acteurs.grand_public.axes.2.title": "Sécurité et éthique",
  "acteurs.grand_public.axes.2.desc": "Deepfakes, arnaques, manipulation de l'information : savoir reconnaître ce qui cherche à vous tromper est devenu une compétence de base. On vous la donne.",
  "acteurs.grand_public.axes.3.title": "Emploi et reconversion",
  "acteurs.grand_public.axes.3.desc": "Votre métier change. Peut-être vite. On vous aide à lire ce qui se passe vraiment sur le marché du travail et à identifier les chemins qui s'ouvrent pour vous.",
  "acteurs.grand_public.axes.4.title": "Passerelles vers la formation",
  "acteurs.grand_public.axes.4.desc": "Si vous voulez aller plus loin, on ne vous laisse pas chercher seul. On vous oriente vers les formations qui correspondent à votre situation et à vos objectifs.",
}

with open('/Users/stv/Documents/zed/icia/content/site.txt', 'a') as f:
    for key, value in content.items():
        f.write(f'# {key}\n')
        f.write(f'{value}\n\n')

print(f"Appended {len(content)} keys")
