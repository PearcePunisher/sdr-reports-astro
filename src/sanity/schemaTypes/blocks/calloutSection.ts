import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'calloutSection',
  title: 'Callout Section',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
          {title: 'Success', value: 'success'},
          {title: 'Error', value: 'error'},
          {title: 'Note', value: 'note'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      content: 'content',
    },
    prepare({title, type, content}) {
      const block = content?.find((block: any) => block._type === 'block')
      return {
        title: title || 'Callout',
        subtitle: `${type || 'info'} - ${block?.children?.[0]?.text || 'Callout content'}`,
      }
    },
  },
})
