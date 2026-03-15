
import { client } from "../../sanity/lib/client";
import TheJourneyPageClient from "./page-client";

export const metadata = {
    title: "The Journey | Our Story | Peckers Chicken - Better Than the Competition",
    description: "Discover the journey of Peckers, the premium alternative to Chicken George and Dave's Hot Chicken. From our humble beginnings in Hitchin to becoming Hertfordshire's top-rated destination for Seriously Good Chicken.",
    keywords: [
        "Peckers story",
        "best chicken Hertfordshire history",
        "Chicken George vs Peckers",
        "Dave's Hot Chicken UK origins",
        "halal chicken background",
        "Peckers Hitchin history",
        "seriously good chicken journey"
    ]
};

export default async function TheJourneyPage() {
    let storyData = {
        pageData: {
            heading: "THE PECKERS JOURNEY",
            subtitle: "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES",
            timeline: []
        },
        bottomPageData: {
            journeySection: {
                heading: "THE PECKERS JOURNEY",
                subtitle: "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES",
                timeline: [
                    { year: "2021", location: "THE BEGINNING" },
                    { year: "2022", location: "EXPANDING" }
                ],
                whereNextHeading: "WHERE NEXT ?",
                whereNextPlaceholder: "Suggest a city...",
                whereNextButtonText: "SUBMIT"
            }
        },
        bottomTimeline: []
    };

    try {
        // Fetch all story related data on the server with a timeout protection
        const fetchedData = await client.fetch(`{
            "pageData": *[_type == "ourStoryPage"][0]{
                heading,
                content,
                quote,
                founderImage {
                    asset->{
                        _id,
                        url
                    }
                },
                storyImages[] {
                    asset->{
                        _id,
                        url
                    }
                },
                slides[] {
                    heading,
                    content,
                    quote,
                    storyImages[] {
                        asset->{
                            _id,
                            url
                        }
                    }
                },
                circleSectionHeading,
                establishedYear,
                timeline
            },
            "bottomPageData": *[_type == "ourStoryBottomPage"][0]{
                journeySection,
                mobileRoadmap
            },
            "bottomTimeline": *[_type == "timeline"] | order(order asc)
        }`, {}, {
            next: { revalidate: 60 } 
        });

        if (fetchedData) {
            storyData = fetchedData;
        }
    } catch (error) {
        console.error("Sanity fetch failed on Journey page:", error);
    }


    return <TheJourneyPageClient initialStoryData={storyData} />;
}

