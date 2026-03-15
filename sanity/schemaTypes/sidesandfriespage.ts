import { defineType, defineField } from "sanity";

export default defineType({
    name: "sidesAndFriesPage",
    title: "Sides & Fries Page",
    type: "document",
    fields: [
        defineField({
            name: "sidesCarousel",
            title: "Sides & Fries Carousel",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "name", title: "Name", type: "string" }),
                        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                        defineField({ name: "boost", title: "Image Boost Scale", type: "number" }),
                        defineField({ name: "ingredients", title: "Ingredients", type: "string" }),
                        defineField({ name: "protein", type: "string" }),
                        defineField({ name: "carbs", type: "string" }),
                        defineField({ name: "fats", type: "string" }),
                        defineField({ name: "calories", type: "string" }),
                        defineField({ name: "energy", type: "string" }),
                        defineField({ name: "allergens", type: "string" }),
                        defineField({ name: "spiceLevel", title: "Spice Level (e.g. 1/4)", type: "string" }),
                        defineField({ name: "availabilityText", type: "string" }),
                    ],
                },
            ],
        }),
    ],
});
