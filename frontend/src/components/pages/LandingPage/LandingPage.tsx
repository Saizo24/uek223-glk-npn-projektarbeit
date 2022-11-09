import React from "react";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import LandingPageBox from "../../organisms/LandingPageBox/LandingPageBox";
import NavBar from "../../organisms/NavBar/NavBar";

export default function LandingPage() {
  return (
    <div>
      <NavBar pageName="Someone's Blog" />
      <LandingPageBox />
      <BottomBar />
    </div>
  );
}
