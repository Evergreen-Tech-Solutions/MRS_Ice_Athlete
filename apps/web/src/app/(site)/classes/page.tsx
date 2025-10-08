import {getClasses} from '@/sanity/queries'
import ClassCard from '@/components/ClassCard'

export const revalidate = 60 // ISR

export default async function ClassesPage() {
  const classes = await getClasses()
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Classes</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((klass) => <ClassCard key={klass._id} klass={klass} />)}
      </div>
    </main>
  )
}
