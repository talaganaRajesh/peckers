import React from "react";
import CareersLandingPage from "./CareersLandingPage";
import CrewPage from "./CrewPage";
import RolesWithPeckers from "./RolesWithPeckers";
import ApplyDetailsPage from "./ApplyDetailsPage";
import { client } from "../../sanity/lib/client";

export const metadata = {
    title: "Careers | Join the Peckers Crew - Seriously Good Chicken",
    description: "Join the Peckers family in Hertfordshire. We're looking for legends to join our kitchen and front-of-house teams. Discover our roles and apply today.",
};

export default async function CareersPage() {
    let careersData = null;

    try {
        careersData = await client.fetch(`*[_type == "crewPage"][0]{
            tagline,
            landingHeading1,
            landingHeading2,
            heading,
            description,
            crewMembers[] {
                label,
                image {
                    asset->{
                        _id,
                        url
                    }
                }
            },
            rolesTitle,
            perks[] {
                title,
                description
            },
            applyTitle,
            applySubtitle
        }`, {}, {
            next: { revalidate: 60 }
        });
    } catch (error) {
        console.error("Sanity fetch failed on Careers page:", error);
    }

    return (
        <div id="main-content">
            <CareersLandingPage initialData={careersData} />
            <CrewPage initialData={careersData} />
            <RolesWithPeckers initialData={careersData} />
            <ApplyDetailsPage initialData={careersData} />
        </div>
    );
}
