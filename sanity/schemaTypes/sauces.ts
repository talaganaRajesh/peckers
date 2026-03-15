import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sauce',
    title: 'Sauce',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),

        defineField({
            name: 'descLine1',
            title: 'Description Line 1',
            type: 'string'
        }),

        defineField({
            name: 'descLine2',
            title: 'Description Line 2',
            type: 'string'
        }),

        defineField({
            name: 'descLine3',
            title: 'Description Line 3',
            type: 'string'
        }),

        defineField({
            name: 'bgImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true }
        }),

        defineField({
            name: 'sauceImage',
            title: 'Sauce Image',
            type: 'image',
            options: { hotspot: true }
        }),

        defineField({
            name: 'rotatingText',
            title: 'Rotating Circular Text',
            type: 'string',
            description: 'The text that rotates around the sauce bottle (e.g., "BUFFALO SAUCE • GARLIC MAYO •")'
        })
    ]
})