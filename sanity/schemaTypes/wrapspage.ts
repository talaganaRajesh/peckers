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
                    name: "wrap",
                    title: "Wrap Details",
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
                            name: "ingredients",
                            title: "Ingredients Subtitle",
                            type: "string",
                        }),
                        defineField({
                            name: "protein",
                            title: "Protein (e.g. 36.5g)",
                            type: "string",
                        }),
                        defineField({
                            name: "carbs",
                            title: "Carbs (e.g. 38.0g)",
                            type: "string",
                        }),
                        defineField({
                            name: "fats",
                            title: "Fats (e.g. 29.6g)",
                            type: "string",
                        }),
                        defineField({
                            name: "calories",
                            title: "Calories (e.g. 544.4 Kcal)",
                            type: "string",
                        }),
                        defineField({
                            name: "energy",
                            title: "Energy (e.g. 2278 kJ)",
                            type: "string",
                        }),
                        defineField({
                            name: "allergens",
                            title: "Allergens (e.g. GLUTEN, MILK, EGGS)",
                            type: "string",
                        }),
                        defineField({
                            name: "spiceLevel",
                            title: "Spice Level (1-4)",
                            type: "string",
                        }),
                        defineField({
                            name: "availabilityText",
                            title: "Availability Footer Text",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
    ],
});
