import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'class',
  title: 'Class',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'summary', type: 'text', title: 'Summary', rows: 3}),
    defineField({
      name: 'difficulty',
      type: 'string',
      title: 'Difficulty',
      options: {list: ['Beginner', 'Intermediate', 'Advanced'] as const}
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      description: '1:1 / Group / Online',
      options: {list: ['1:1', 'Group', 'Online'] as const},
      validation: r => r.required()
    }),
    defineField({name: 'duration', type: 'string', title: 'Duration (e.g., 2h, Full day)'}),
    defineField({name: 'basePrice', type: 'number', title: 'Base Price (CAD)', validation: r => r.min(0)}),
    defineField({name: 'coverImage', type: 'image', title: 'Cover Image', options: {hotspot: true}}),
    defineField({
      name: 'whatYouLearn',
      type: 'array',
      title: 'What You’ll Learn',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'requiredGear',
      type: 'array',
      title: 'Required Gear',
      of: [{type: 'string'}]
    })
  ],
  preview: {
    select: {title: 'title', media: 'coverImage'}
  }
})
