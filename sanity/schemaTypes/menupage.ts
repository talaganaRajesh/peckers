import { defineType, defineField } from "sanity";

export default defineType({
    name: "menuPage",
    title: "Menu Page",
    type: "document",
    fields: [
        defineField({
            name: "burgerCarousel",
            title: "Burger Carousel",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Burger Name",
                            type: "string",
                        }),
                        defineField({
                            name: "image",
                            title: "Burger Image",
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
                            title: "Ingredients",
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
                            type: "string", // Changed to string to handle '1/4' or 'Depends'
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