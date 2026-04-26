import { defineType, defineField } from "sanity";

const menuItemFields = [
    defineField({
        name: "name",
        title: "Name",
        type: "string",
    }),
    defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
            source: "name",
            maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "image",
        title: "Image",
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
        name: "seoDescription",
        title: "SEO Description",
        type: "text",
        description: "Description used for SEO meta tags (150-160 characters).",
        validation: (Rule) => Rule.max(160),
    }),
    defineField({
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
        description: "Keywords used for SEO.",
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
];

export default defineType({
    name: "menuPage",
    title: "Menu Page — Product Details",
    type: "document",
    fields: [
        defineField({
            name: "burgerCarousel",
            title: "Burger Carousel",
            type: "array",
            of: [{ type: "object", name: "burger", title: "Burger Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "wrapsCarousel",
            title: "Wraps Carousel",
            type: "array",
            of: [{ type: "object", name: "wrap", title: "Wrap Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "riceBowlsCarousel",
            title: "Rice Bowls Carousel",
            type: "array",
            of: [{ type: "object", name: "riceBowl", title: "Rice Bowl Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "saladBowlsCarousel",
            title: "Salad Bowls Carousel",
            type: "array",
            of: [{ type: "object", name: "saladBowl", title: "Salad Bowl Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "wingsAndTendersCarousel",
            title: "Wings & Tenders Carousel",
            type: "array",
            of: [{ type: "object", name: "wingsAndTenders", title: "Wings & Tenders Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "periPeriGrillCarousel",
            title: "Peri-Peri Grill Carousel",
            type: "array",
            of: [{ type: "object", name: "periPeriGrill", title: "Peri-Peri Grill Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "whatsNewCarousel",
            title: "What's New Carousel",
            type: "array",
            of: [{ type: "object", name: "whatsNew", title: "What's New Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "shakesCarousel",
            title: "Shakes Carousel",
            type: "array",
            of: [{ type: "object", name: "shake", title: "Shake Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "vegCarousel",
            title: "Veg Carousel",
            type: "array",
            of: [{ type: "object", name: "veg", title: "Veg Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "sidesAndFriesCarousel",
            title: "Sides & Fries Carousel",
            type: "array",
            of: [{ type: "object", name: "sidesAndFries", title: "Sides & Fries Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "mealBoxCarousel",
            title: "Meal Box Carousel",
            type: "array",
            of: [{ type: "object", name: "mealBox", title: "Meal Box Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "kidsCarousel",
            title: "Kids Carousel",
            type: "array",
            of: [{ type: "object", name: "kidsItem", title: "Kids Item Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
        defineField({
            name: "lunchDealsCarousel",
            title: "Lunch Deals Carousel",
            type: "array",
            of: [{ type: "object", name: "lunchDealsItem", title: "Lunch Deals Item Details", fields: menuItemFields, preview: { select: { title: 'name', media: 'image' } } }],
        }),
    ],
});