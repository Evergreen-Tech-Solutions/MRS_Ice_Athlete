import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'author', type: 'string', title: 'Author', validation: r => r.required()}),
    defineField({name: 'content', type: 'text', title: 'Content', validation: r => r.required()}),
    defineField({name: 'rating', type: 'number', title: 'Rating (1–5)', validation: r => r.min(1).max(5)}),
    defineField({name: 'authorImage', type: 'image', title: 'Author Image', options: {hotspot: true}})
  ],
  preview: {
    select: {title: 'author', subtitle: 'content', media: 'authorImage'}
  }
})
