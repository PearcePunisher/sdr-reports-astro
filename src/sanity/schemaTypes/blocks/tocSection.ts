import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tocSection',
  title: 'Table of Contents Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Table of Contents',
    }),
    defineField({
      name: 'autoGenerate',
      title: 'Auto-generate from headings',
      type: 'boolean',
      description: 'Automatically generate TOC from section headings',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Manual TOC Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'anchor',
              title: 'Anchor/ID',
              type: 'string',
              description: 'The section ID to link to',
            },
          ],
          preview: {
            select: {
              title: 'title',
              anchor: 'anchor',
            },
            prepare({title, anchor}) {
              return {
                title,
                subtitle: anchor ? `#${anchor}` : 'No anchor',
              }
            },
          },
        },
      ],
      hidden: ({parent}) => parent?.autoGenerate === true,
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      autoGenerate: 'autoGenerate',
    },
    prepare({heading, autoGenerate}) {
      return {
        title: heading || 'Table of Contents',
        subtitle: autoGenerate ? 'Auto-generated' : 'Manual',
      }
    },
  },
})
