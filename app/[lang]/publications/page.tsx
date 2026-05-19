import { redirect } from 'next/navigation'

export default function PublicationsRedirect({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang === 'en' ? 'en' : 'fr'}/actualites`)
}
