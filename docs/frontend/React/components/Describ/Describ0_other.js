import React from "react";
export function Profile2() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export function getImageUrl(person, size = "s") {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}

export function getImageUrl2(person) {
  return "https://i.imgur.com/" + person.imageId + "s.jpg";
}
