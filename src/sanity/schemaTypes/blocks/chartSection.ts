import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'chartSection',
  title: 'Chart Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Chart Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'chartType',
      title: 'Chart Type',
      type: 'string',
      options: {
        list: [
          {title: 'Bar Chart', value: 'bar'},
          {title: 'Line Chart', value: 'line'},
          {title: 'Pie Chart', value: 'pie'},
          {title: 'Area Chart', value: 'area'},
          {title: 'Scatter Plot', value: 'scatter'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Chart Data (JSON)',
      type: 'text',
      rows: 10,
      description: 'Enter chart data in JSON format',
    }),
    defineField({
      name: 'chartImage',
      title: 'Chart Image (Alternative)',
      type: 'image',
      description: 'Upload a chart image as an alternative to JSON data',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      chartType: 'chartType',
      media: 'chartImage',
    },
    prepare({title, chartType}) {
      return {
        title: title || 'Chart',
        subtitle: chartType ? `${chartType} chart` : 'Chart Section',
      }
    },
  },
})
