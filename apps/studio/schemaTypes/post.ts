import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'excerpt', type: 'text', title: 'Excerpt', rows: 3}),
    defineField({name: 'coverImage', type: 'image', title: 'Cover Image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', type: 'datetime', title: 'Published At'}),
    defineField({name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}]})
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', subtitle: 'publishedAt'},
    prepare({title, media, subtitle}) {
      return {title, media, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : ''}
    }
  }
})
