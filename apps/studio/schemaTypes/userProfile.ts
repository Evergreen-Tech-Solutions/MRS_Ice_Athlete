import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'userProfile',
  title: 'User Profile',
  type: 'document',
  fields: [
    defineField({name: 'email', type: 'email', title: 'Email', validation: r => r.required()}),
    defineField({name: 'name', type: 'string', title: 'Name'}),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      options: {list: ['admin', 'trainee'] as const},
      initialValue: 'trainee',
      validation: r => r.required()
    }),
    defineField({name: 'avatar', type: 'image', title: 'Avatar', options: {hotspot: true}})
  ],
  preview: {
    select: {title: 'name', subtitle: 'email', media: 'avatar'}
  }
})
