import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'referencesSection',
  title: 'References Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'References',
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'citation',
              title: 'Citation',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'citation',
              url: 'url',
            },
            prepare({title, url}) {
              return {
                title: title || 'Reference',
                subtitle: url || 'No URL',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      references: 'references',
    },
    prepare({heading, references}) {
      const count = references?.length || 0
      return {
        title: heading || 'References',
        subtitle: `${count} ${count === 1 ? 'reference' : 'references'}`,
      }
    },
  },
})
