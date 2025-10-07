import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({name: 'classRef', type: 'reference', title: 'Class', to: [{type: 'class'}], validation: r => r.required()}),
    defineField({name: 'sessionRef', type: 'reference', title: 'Session', to: [{type: 'session'}], validation: r => r.required()}),
    defineField({name: 'customerName', type: 'string', title: 'Customer Name', validation: r => r.required()}),
    defineField({name: 'email', type: 'email', title: 'Customer Email', validation: r => r.required()}),
    defineField({name: 'qty', type: 'number', title: 'Seats', validation: r => r.required().min(1)}),
    defineField({name: 'amountPaid', type: 'number', title: 'Amount Paid (cents)', description: 'Store in cents from Stripe', validation: r => r.min(0)}),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {list: ['pending', 'paid', 'refunded', 'cancelled'] as const},
      initialValue: 'pending',
      validation: r => r.required()
    }),
    defineField({name: 'stripePaymentIntentId', type: 'string', title: 'Stripe PaymentIntent ID'}),
    defineField({name: 'createdAt', type: 'datetime', title: 'Created At', initialValue: () => new Date().toISOString()})
  ],
  preview: {
    select: {
      title: 'customerName',
      email: 'email',
      status: 'status'
    },
    prepare({title, email, status}) {
      return {title: title || 'Booking', subtitle: `${email || ''} • ${status}`}
    }
  }
})
