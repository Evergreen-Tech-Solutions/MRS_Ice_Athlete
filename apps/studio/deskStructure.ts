import {StructureBuilder} from 'sanity/desk'

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Training')
        .child(
          S.list()
            .title('Training')
            .items([
              S.documentTypeListItem('class').title('Classes'),
              S.documentTypeListItem('session').title('Sessions'),
              S.documentTypeListItem('booking').title('Bookings')
            ])
        ),
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('athlete').title('Athlete Profile'),
              S.documentTypeListItem('mediaAsset').title('Media'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('post').title('Posts')
            ])
        ),
      S.divider(),
      S.documentTypeListItem('userProfile').title('User Profiles')
    ])

export default deskStructure
