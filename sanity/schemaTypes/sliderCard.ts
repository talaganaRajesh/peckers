import { defineType, defineField } from "sanity";

export default defineType({
    name: "sliderCard",
    title: "Slider Card",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Card Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
    ],
});