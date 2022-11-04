import React from "react";
import BottomBar from "../../organisms/BottomBar/BottomBar";
import NavBar from "../../organisms/NavBar/NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar pageName="Your Blog (definitely not Twitter)" />
      <p>PlaceHolder</p>
      <BottomBar />
    </div>
  );
}
