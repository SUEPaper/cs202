import React, { useState, useEffect } from "react";
import { Avatar, getImageUrl } from "./Describ_6_other.js";
function Avatar1_6_1() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export function Profile1_6_1() {
  return <Avatar1_6_1 />;
}

function Avatar1_6_2({ person, size }) {
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

export function Profile1_6_2() {
  return (
    <div>
      <Avatar1_6_2
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar1_6_2
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar1_6_2
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export function Profile1_6_3() {
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

function Clock({ color, time }) {
  return <h1 style={{ color: color }}>{time}</h1>;
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function App1_6_4() {
  const time = useTime();
  const [color, setColor] = useState("lightcoral");
  return (
    <div>
      <p>
        选择一个颜色:{" "}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="lightcoral">浅珊瑚色</option>
          <option value="midnightblue">午夜蓝</option>
          <option value="rebeccapurple">丽贝卡紫</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
