import { defineType, defineField } from "sanity";

export default defineType({
    name: "wrapsPage",
    title: "Wraps Page",
    type: "document",
    fields: [
        defineField({
            name: "wrapsCarousel",
            title: "Wraps Carousel",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Wrap Name",
                            type: "string",
                        }),
                        defineField({
                            name: "image",
                            title: "Wrap Image",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "boost",
                            title: "Image Boost Scale",
                            type: "number",
                        }),
                        defineField({
                            name: "subtitle",
                            title: "Ingredients Subtitle",
                            type: "string",
                        }),
                        defineField({
                            name: "protein",
                            type: "string",
                        }),
                        defineField({
                            name: "carbs",
                            type: "string",
                        }),
                        defineField({
                            name: "fats",
                            type: "string",
                        }),
                        defineField({
                            name: "calories",
                            type: "string",
                        }),
                        defineField({
                            name: "energy",
                            type: "string",
                        }),
                        defineField({
                            name: "allergens",
                            type: "string",
                        }),
                        defineField({
                            name: "spiceLevel",
                            title: "Spice Level (1-4)",
                            type: "string",
                        }),
                        defineField({
                            name: "availabilityText",
                            type: "string",
                        }),
                    ],

                },
            ],
        }),
    ],
});
