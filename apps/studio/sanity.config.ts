import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {
  WrenchIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentTextIcon,
  UsersIcon,
  CodeBlockIcon,
  BlockElementIcon,
  DiamondIcon,
} from '@sanity/icons'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE || "Jamie's Reparaturdienst",

  projectId: process.env.SANITY_PROJECT_ID || '3ex1dz2d',
  dataset: process.env.SANITY_DATASET || 'production',

  projectVersion: process.env.SANITY_STUDIO_VERSION || '2024-01-01',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Tips')
              .child(
                S.documentList().title('Tips').apiVersion('v2025-07-04').filter('_type == "tip"'),
              )
              .icon(ComposeIcon),
            S.listItem()
              .title('Pages')
              .child(
                S.documentList().title('Pages').apiVersion('v2025-07-04').filter('_type == "page"'),
              )
              .icon(DocumentIcon),
            S.listItem()
              .title('Notes')
              .child(
                S.documentList().title('Notes').apiVersion('v2025-07-04').filter('_type == "note"'),
              )
              .icon(DocumentTextIcon),
            S.divider(),
            S.listItem()
              .title('Avatars')
              .child(
                S.documentList()
                  .title('Avatars')
                  .apiVersion('v2025-07-04')
                  .filter('_type == "avatar"'),
              )
              .icon(UsersIcon),
            S.listItem()
              .title('Blocks')
              .child(
                S.documentList()
                  .title('Blocks')
                  .apiVersion('v2025-07-04')
                  .filter('_type == "blockdocument"'),
              )
              .icon(CodeBlockIcon),
            S.listItem()
              .title('Cards')
              .child(
                S.documentList().title('Cards').apiVersion('v2025-07-04').filter('_type == "card"'),
              )
              .icon(BlockElementIcon),
            S.listItem()
              .title('Socials')
              .child(
                S.documentList()
                  .title('Socials')
                  .apiVersion('v2025-07-04')
                  .filter('_type == "social"'),
              )
              .icon(DiamondIcon),
            S.divider(),
            S.listItem()
              .title('Settings')
              .child(S.document().schemaType('settings').documentId('settings'))
              .icon(WrenchIcon),
          ]),
    }),
    visionTool(),
    codeInput(),
    colorInput(),
    media({
      creditLine: {
        enabled: true,
        excludeSources: ['unsplash'],
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
