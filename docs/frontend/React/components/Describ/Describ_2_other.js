import React from "react";

function Profile1_2_1() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export function Gallery1_2_1() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile1_2_1 />
      <Profile1_2_1 />
      <Profile1_2_1 />
    </section>
  );
}

export function Profile1_2_2() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery1_2_2() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile1_2_2 />
      <Profile1_2_2 />
      <Profile1_2_2 />
    </section>
  );
}
