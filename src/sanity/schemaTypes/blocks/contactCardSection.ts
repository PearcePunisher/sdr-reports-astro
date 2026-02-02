import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactCardSection',
  title: 'Contact Card Section',
  type: 'object',
  fields: [
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading for this contact section',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      people: 'people',
    },
    prepare({heading, people}) {
      const count = people?.length || 0
      return {
        title: heading || 'Contact Cards',
        subtitle: `${count} ${count === 1 ? 'person' : 'people'}`,
      }
    },
  },
})
