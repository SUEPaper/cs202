import React from "react";

export function Profile1_1_1() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}

function Profile1_1_2() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export function Gallery1_1_1() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile1_1_2 />
      <Profile1_1_2 />
      <Profile1_1_2 />
    </section>
  );
}
