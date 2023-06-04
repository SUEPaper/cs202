import React from "react";

function Recipe1_9_1({ drinkers }) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>
        Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.
      </li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export function App1_9_1() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe1_9_1 drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe1_9_1 drinkers={4} />
    </section>
  );
}

let guest = 0;

function Cup1_9_2() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export function TeaSet1_9_2() {
  return (
    <>
      <Cup1_9_2 />
      <Cup1_9_2 />
      <Cup1_9_2 />
    </>
  );
}

function Cup1_9_3({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export function TeaSet1_9_3() {
  return (
    <>
      <Cup1_9_3 guest={1} />
      <Cup1_9_3 guest={2} />
      <Cup1_9_3 guest={3} />
    </>
  );
}

function Cup1_9_4({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export function TeaGathering1_9_4() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup1_9_4 key={i} guest={i} />);
  }
  return cups;
}
