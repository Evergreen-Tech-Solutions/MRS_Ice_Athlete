import {getClassBySlug} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import Image from 'next/image'
import Link from 'next/link'

type Props = { params: { slug: string } }

export async function generateMetadata({params}: Props) {
  const data = await getClassBySlug(params.slug)
  return { title: `${data?.title || 'Class'} | Ice Athlete` }
}

export default async function ClassDetail({params}: Props) {
  const data = await getClassBySlug(params.slug)
  if (!data) return <div className="max-w-3xl mx-auto px-4 py-10">Class not found.</div>

  const cover = data.coverImage ? urlFor(data.coverImage).width(1600).height(900).fit('crop').url() : null

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-extrabold">{data.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{data.summary}</p>
        <div className="text-sm text-gray-500">
          {data.difficulty} • {data.category} {data.duration ? `• ${data.duration}` : ''} {typeof data.basePrice==='number' ? `• $${data.basePrice.toFixed(2)} CAD` : ''}
        </div>
      </header>

      {cover && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
          <Image src={cover} alt={data.title} fill className="object-cover" />
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming Sessions</h2>
        {(!data.sessions || data.sessions.length === 0) && (
          <p className="text-gray-600">No upcoming sessions yet. Check back soon.</p>
        )}
        <ul className="space-y-3">
          {data.sessions?.map((s: any) => (
            <li key={s._id} className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <div className="font-medium">
                  {new Date(s.start).toLocaleString()} — {s.location || 'TBA'}
                </div>
                <div className="text-xs text-gray-500">Capacity: {s.capacity} • Status: {s.status}</div>
              </div>
              <Link
                href={`/checkout?sid=${s._id}`} // placeholder; we’ll wire Stripe later
                className="px-3 py-2 rounded-md bg-black text-white hover:opacity-90"
              >
                Book & Pay
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
