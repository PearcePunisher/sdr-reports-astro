import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
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
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Agribusiness & Food Value Chain', value: 'agribusiness-food'},
          {title: 'Distribution & Logistics', value: 'distribution-logistics'},
          {title: 'Industrial & Infrastructure Services', value: 'industrial-infrastructure'},
          {title: 'Manufacturing', value: 'manufacturing'},
          {title: 'Pet Industry', value: 'pet-industry'},
          {title: 'Professional Services', value: 'professional-services'},
          {title: 'Software & IT Services', value: 'software-it'},
          {title: 'Wellness & Health Services', value: 'wellness-health'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'keyTakeawaysSection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'textSection'},
        {type: 'chartSection'},
        {type: 'calloutSection'},
        {type: 'ctaSection'},
        {type: 'imageSection'},
        {type: 'tocSection'},
      ],
    }),
    defineField({
      name: 'contactCards',
      title: 'Contact Cards',
      type: 'contactCardSection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'referencesSection',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
})
