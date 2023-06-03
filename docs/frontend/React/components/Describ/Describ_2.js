import React from "react";
import Gallery1_2_2, { Gallery1_2_1, Profile1_2_2 } from "./Describ_2_other.js";

export function App1_2_1() {
  return <Gallery1_2_1 />;
}
export function App1_2_2() {
  return <Profile1_2_2 />;
}

export function TodoList1_2_1() {
  return (
    <>
      <h1>海蒂·拉玛的代办事项</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </>
  );
}
