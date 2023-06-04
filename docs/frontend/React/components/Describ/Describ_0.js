import React from "react";
import { Profile2, getImageUrl, getImageUrl2 } from "./Describ0_other.js";
import { people } from "./Describ0_data.js";

function Profile1() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export function Gallery1() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile1 />
      <Profile1 />
      <Profile1 />
    </section>
  );
}

export function Gallery2() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile2 />
      <Profile2 />
      <Profile2 />
    </section>
  );
}

export function TodoList1() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}

const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export function TodoList2() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

export function Profile3() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
}

export function PackingList1() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}

export function List1() {
  const listItems = people.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}

let guest = 0;

function Cup1() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export function TeaSet1() {
  const minus = () => {
    if (guest > 10) guest = 0;
  };
  return (
    <>
      <Cup1 />
      <Cup1 />
      <Cup1 />
      {minus()}
    </>
  );
}

function Cup2({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export function TeaSet2() {
  return (
    <>
      <Cup2 guest={1} />
      <Cup2 guest={2} />
      <Cup2 guest={3} />
    </>
  );
}
