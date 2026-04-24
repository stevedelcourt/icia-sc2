content = {
  # Contact Formspree
  "contact_formspree.label": "Contact",
  "contact_formspree.title": "Commençons par un premier coup de sonde éditorial, voyons ensuite.",
  "contact_formspree.form.prenom": "Prenom",
  "contact_formspree.form.nom": "Nom",
  "contact_formspree.form.email": "E-mail",
  "contact_formspree.form.entreprise": "Entreprise",
  "contact_formspree.form.secteur": "Secteur d'activite",
  "contact_formspree.form.effectif": "Nombre d'effectifs",
  "contact_formspree.form.priorite": "Quelle est votre priorite",
  "contact_formspree.form.consent": "J'accepte de recevoir des informations et des offres de MariusIA, conformément à la politique de confidentialité.",
  "contact_formspree.form.submit": "Envoyer votre demande",
  "contact_formspree.form.submitting": "Envoi...",
  "contact_formspree.form.select_default": "Choisissez une valeur",
  "contact_formspree.form.secteur.pme": "PME / ETI",
  "contact_formspree.form.secteur.collectivite": "Collectivite / Service public",
  "contact_formspree.form.secteur.education": "Education / Formation",
  "contact_formspree.form.secteur.creatif": "Industries créatives",
  "contact_formspree.form.secteur.citoyen": "Particulier / Demandeur d'emploi",
  "contact_formspree.form.secteur.autre": "Autre",
  "contact_formspree.form.effectif.1_10": "1 a 10",
  "contact_formspree.form.effectif.11_50": "11 a 50",
  "contact_formspree.form.effectif.51_250": "51 a 250",
  "contact_formspree.form.effectif.251_1000": "251 a 1000",
  "contact_formspree.form.effectif.1000+": "Plus de 1000",
  "contact_formspree.form.priorite.ai_act": "Comprendre l'AI Act et mes obligations",
  "contact_formspree.form.priorite.diagnostic": "Faire un diagnostic IA",
  "contact_formspree.form.priorite.formation": "Former mes equipes",
  "contact_formspree.form.priorite.transformation": "Transformer mon organisation",
  "contact_formspree.form.priorite.partenaire": "Avoir un partenaire IA",
  "contact_formspree.form.priorite.autre": "Autre",
  "contact_formspree.success.title": "Merci !",
  "contact_formspree.success.body": "Nous avons bien reçu votre demande. Nous vous répondrons sous 48h.",
  "contact_formspree.success.retour": "Retour à l'accueil",
}

with open('/Users/stv/Documents/zed/icia/content/site.txt', 'a') as f:
    for key, value in content.items():
        f.write(f'# {key}\n')
        f.write(f'{value}\n\n')

print(f"Appended {len(content)} keys")
