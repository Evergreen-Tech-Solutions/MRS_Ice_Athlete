import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'MRS',

  projectId: 'bp41jt1a',
  dataset: 'production',

   plugins: [
    deskTool({structure: deskStructure}),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
