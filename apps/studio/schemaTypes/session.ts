import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'session',
  title: 'Session',
  type: 'document',
  fields: [
    defineField({name: 'classRef', type: 'reference', title: 'Class', to: [{type: 'class'}], validation: r => r.required()}),
    defineField({name: 'start', type: 'datetime', title: 'Start', validation: r => r.required()}),
    defineField({name: 'end', type: 'datetime', title: 'End', validation: r => r.required()}),
    defineField({name: 'capacity', type: 'number', title: 'Capacity', validation: r => r.required().min(1)}),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {list: ['scheduled', 'cancelled', 'full'] as const},
      initialValue: 'scheduled',
      validation: r => r.required()
    }),
    defineField({name: 'location', type: 'string', title: 'Location (or Online)'}),
    defineField({name: 'notes', type: 'text', title: 'Notes'})
  ],
  preview: {
    select: {
      title: 'classRef.title',
      start: 'start'
    },
    prepare({title, start}) {
      return {title: title || 'Untitled class', subtitle: start ? new Date(start).toLocaleString() : ''}
    }
  }
})
