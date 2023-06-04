import React from "react";
import { people1_8_1, people1_8_2 } from "./Descrlib_8_data.js";
import { getImageUrl1_8_1, getImageUrl1_8_2 } from "./Describ_8_other.js";
const people1_8_0 = [
  "凯瑟琳·约翰逊: 数学家",
  "马里奥·莫利纳: 化学家",
  "穆罕默德·阿卜杜勒·萨拉姆: 物理学家",
  "珀西·莱温·朱利亚: 化学家",
  "苏布拉马尼扬·钱德拉塞卡: 天体物理学家",
];

export function List1_8_0() {
  const listItems = people1_8_0.map((person) => <li>{person}</li>);
  return <ul>{listItems}</ul>;
}

export function List1_8_1() {
  const chemists = people1_8_1.filter(
    (person) => person.profession === "化学家"
  );
  const listItems = chemists.map((person) => (
    <li>
      <img src={getImageUrl1_8_1(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}因{person.accomplishment}而闻名世界
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export function List1_8_2() {
  const listItems = people1_8_2.map((person) => (
    <li key={person.id}>
      <img src={getImageUrl1_8_2(person)} alt={person.name} />
      <p>
        <b>{person.name}</b>
        {" " + person.profession + " "}因{person.accomplishment}而闻名世界
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
