import React from "react";
function Item1_7_1({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export function PackingList1_7_1() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_1 isPacked={true} name="宇航服" />
        <Item1_7_1 isPacked={true} name="带金箔的头盔" />
        <Item1_7_1 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_2({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export function PackingList1_7_2() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_2 isPacked={true} name="宇航服" />
        <Item1_7_2 isPacked={true} name="带金箔的头盔" />
        <Item1_7_2 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_3({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export function PackingList1_7_3() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_3 isPacked={true} name="宇航服" />
        <Item1_7_3 isPacked={true} name="带金箔的头盔" />
        <Item1_7_3 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_4({ name, isPacked }) {
  return <li className="item">{isPacked ? <del>{name + " ✔"}</del> : name}</li>;
}

export function PackingList1_7_4() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_4 isPacked={true} name="宇航服" />
        <Item1_7_4 isPacked={true} name="带金箔的头盔" />
        <Item1_7_4 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_5({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
}

export function PackingList1_7_5() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_5 isPacked={true} name="宇航服" />
        <Item1_7_5 isPacked={true} name="带金箔的头盔" />
        <Item1_7_5 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_6({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return <li className="item">{itemContent}</li>;
}

export function PackingList1_7_6() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_6 isPacked={true} name="宇航服" />
        <Item1_7_6 isPacked={true} name="带金箔的头盔" />
        <Item1_7_6 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}

function Item1_7_7({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = <del>{name + " ✔"}</del>;
  }
  return <li className="item">{itemContent}</li>;
}

export function PackingList1_7_7() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item1_7_7 isPacked={true} name="宇航服" />
        <Item1_7_7 isPacked={true} name="带金箔的头盔" />
        <Item1_7_7 isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}
