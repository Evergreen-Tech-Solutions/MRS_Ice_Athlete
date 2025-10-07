import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaAsset',
  title: 'Media (Images & Clips)',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: r => r.required()}),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {list: ['image', 'video'] as const},
      validation: r => r.required()
    }),
    defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
    defineField({name: 'file', type: 'file', title: 'Video File / Clip'}),
    defineField({name: 'caption', type: 'string', title: 'Caption'}),
    defineField({name: 'credit', type: 'string', title: 'Credit/Source'}),
    defineField({name: 'tags', type: 'array', title: 'Tags', of: [{type: 'string'}]})
  ],
  preview: {
    select: {title: 'title', media: 'image'}
  }
})
