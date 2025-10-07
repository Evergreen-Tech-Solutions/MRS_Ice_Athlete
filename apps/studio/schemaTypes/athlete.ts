import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'athlete',
  title: 'Athlete Profile',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Name', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'name', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'heroImage', type: 'image', title: 'Hero Image', options: {hotspot: true}}),
    defineField({name: 'bio', type: 'array', title: 'Bio', of: [{type: 'block'}]}),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'year', type: 'number', title: 'Year', validation: r => r.required()},
          {name: 'title', type: 'string', title: 'Title', validation: r => r.required()},
          {name: 'details', type: 'text', title: 'Details'}
        ]
      }],
    }),
    defineField({
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Name', validation: r => r.required()},
          {name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}},
          {name: 'url', type: 'url', title: 'Website'}
        ]
      }]
    })
  ],
  preview: {
    select: {title: 'name', media: 'heroImage'}
  }
})
