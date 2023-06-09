import React, { useState } from "react";
import { sculptureList2_0_2 } from "./Add_data.js";
//import { people } from "./Add_data.js";

export  function App2_0_1() {
    return (
      <Toolbar2_0_1
        onPlayMovie={() => alert('Playing!')}
        onUploadImage={() => alert('Uploading!')}
      />
    );
  }
  
  function Toolbar2_0_1({ onPlayMovie, onUploadImage }) {
    return (
      <div>
        <Button2_0_1 onClick={onPlayMovie}>
          Play Movie
        </Button2_0_1>
        <Button2_0_1 onClick={onUploadImage}>
          Upload Image
        </Button2_0_1>
      </div>
    );
  }
  
  function Button2_0_1({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  


  
  export function Gallery2_0_2() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const hasNext = index < sculptureList2_0_2.length - 1;
  
    function handleNextClick2_0_2() {
      if (hasNext) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }
  
    function handleMoreClick2_0_2() {
      setShowMore(!showMore);
    }
  
    let sculpture2_0_2 = sculptureList2_0_2[index];
    return (
      <>
        <button onClick={handleNextClick2_0_2}>
          Next
        </button>
        <h2>
          <i>{sculpture2_0_2.name} </i>
          by {sculpture2_0_2.artist}
        </h2>
        <h3>
          ({index + 1} of {sculptureList2_0_2.length})
        </h3>
        <button onClick={handleMoreClick2_0_2}>
          {showMore ? 'Hide' : 'Show'} details
        </button>
        {showMore && <p>{sculpture2_0_2.description}</p>}
        <img
          src={sculpture2_0_2.url}
          alt={sculpture2_0_2.alt}
        />
      </>
    );
  }
  


  export  function Form2_0_3() {
    const [to, setTo] = useState('Alice');
    const [message, setMessage] = useState('Hello');
  
    function handleSubmit(e) {
      e.preventDefault();
      setTimeout(() => {
        alert(`You said ${message} to ${to}`);
      }, 5000);
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          To:{' '}
          <select
            value={to}
            onChange={e => setTo(e.target.value)}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </label>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    );
  }



  export  function Counter2_0_4() {
    const [score, setScore] = useState(0);
  
    function increment() {
      setScore(score + 1);
    }
  
    return (
      <>
        <button onClick={() => increment()}>+1</button>
        <button onClick={() => {
          increment();
          increment();
          increment();
        }}>+3</button>
        <h1>Score: {score}</h1>
      </>
    )
  }



  export function Counter2_0_5() {
    const [score, setScore] = useState(0);
  
    function increment() {
      setScore(s => s + 1);
    }
  
    return (
      <>
        <button onClick={() => increment()}>+1</button>
        <button onClick={() => {
          increment();
          increment();
          increment();
        }}>+3</button>
        <h1>Score: {score}</h1>
      </>
    )
  }



import { useImmer } from 'use-immer';
export function Form2_0_6() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}




let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export function BucketList2_0_7() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList2_0_7
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList2_0_7({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}



export function BucketList2_0_8() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList2_0_8
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList2_0_8({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
