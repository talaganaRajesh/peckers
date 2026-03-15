"use client";

import React, { useState } from "react";
import UniquenessLandingPage from "./LandingPage";
import SubSections from "./SubSections";

const UniquenessPage = ({ initialData }) => {
  const { landingData, sectionsData } = initialData || {};

  return (
    <div id="main-content" className="uniqueness-page">

      <UniquenessLandingPage initialData={landingData} />
      <SubSections initialData={sectionsData} />

    </div>
  )
}

export default UniquenessPage;
