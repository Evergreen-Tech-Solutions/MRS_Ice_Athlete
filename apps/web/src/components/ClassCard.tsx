import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/sanity/image'
import {ClassItem} from '@/sanity/queries'

export default function ClassCard({klass}: {klass: ClassItem}) {
  const img = klass.coverImage ? urlFor(klass.coverImage).width(800).height(500).fit('crop').url() : null
  return (
    <Link href={`/class/${klass.slug.current}`} className="block rounded-xl overflow-hidden border hover:shadow-lg transition">
      {img && (
        <div className="relative aspect-[16/10]">
          <Image src={img} alt={klass.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{klass.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{klass.summary}</p>
        <div className="mt-2 text-xs text-gray-500">
          <span>{klass.difficulty || 'All levels'}</span> • <span>{klass.category}</span> {klass.duration ? `• ${klass.duration}` : ''}
        </div>
        {typeof klass.basePrice === 'number' && (
          <div className="mt-2 font-bold">${(klass.basePrice).toFixed(2)} CAD</div>
        )}
      </div>
    </Link>
  )
}
