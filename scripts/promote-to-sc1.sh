#!/bin/bash
set -e

echo "=========================================="
echo "  PROMOTE sc2 → sc1 (FTP à FTP statique)"
echo "=========================================="
echo ""
echo "Source : /Users/stv/Documents/zed/icia-sc2/out/"
echo "Cible  : sc1bovu7233.universe.wf/public_html/"
echo ""

# 1. Vérifier que out/ existe et est buildé
if [ ! -f "out/index.html" ]; then
  echo "❌ Erreur : out/index.html introuvable."
  echo "   Fais d'abord : rm -rf out .next && NEXT_EXPORT=true npm run build"
  exit 1
fi

# 2. Confirmation manuelle
read -p "Type YES pour tout effacer sc1 et uploader sc2 : " CONFIRM
if [ "$CONFIRM" != "YES" ]; then
  echo "❌ Annulé."
  exit 1
fi

# 3. FTP : effacer tout sc1, puis uploader sc2
echo "🚀 Connexion FTP sc1..."
lftp -c "
  set ftp:ssl-allow no;
  open -u sc1bovu7233,'RoxanPascalSteven2024' sc1bovu7233.universe.wf;
  
  # Effacer tout dans public_html
  cd public_html;
  glob -a rm -r *;
  
  # Upload sc2
  lcd /Users/stv/Documents/zed/icia-sc2/out;
  mirror -R . .;
"

echo ""
echo "✅ sc1 est maintenant le site bilingue FR/EN !"
