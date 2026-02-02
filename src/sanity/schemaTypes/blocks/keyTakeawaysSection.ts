import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'keyTakeawaysSection',
  title: 'Key Takeaways Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Key Takeaways',
    }),
    defineField({
      name: 'takeaways',
      title: 'Takeaways',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Takeaway Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Takeaway Content',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
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
      takeaways: 'takeaways',
    },
    prepare({heading, takeaways}) {
      const count = takeaways?.length || 0
      return {
        title: heading || 'Key Takeaways',
        subtitle: `${count} ${count === 1 ? 'takeaway' : 'takeaways'}`,
      }
    },
  },
})
