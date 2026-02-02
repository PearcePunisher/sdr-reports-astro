import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Wide', value: 'wide'},
          {title: 'Normal', value: 'normal'},
          {title: 'Small', value: 'small'},
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      caption: 'caption',
      alt: 'image.alt',
    },
    prepare({media, caption, alt}) {
      return {
        title: caption || alt || 'Image',
        subtitle: 'Image Section',
        media,
      }
    },
  },
})
