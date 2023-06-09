import React, { useState } from "react";
import { sculptureList2_2_1 } from "./Add_data.js";

export function Gallery2_2_1() {
  let index = 0;

  function handleClick2_2_1() {
    index = index + 1;
  }

  let sculpture2_2_1 = sculptureList2_2_1[index];
  return (
    <>
      <button onClick={handleClick2_2_1}>
        Next
      </button>
      <h2>
        <i>{sculpture2_2_1.name} </i> 
        by {sculpture2_2_1.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList2_2_1.length})
      </h3>
      <img 
        src={sculpture2_2_1.url} 
        alt={sculpture2_2_1.alt}
      />
      <p>
        {sculpture2_2_1.description}
      </p>
    </>
  );
}



import { sculptureList2_2_2 } from './Add_data.js';

export function Gallery2_2_2() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick2_2_2() {
    setIndex(index + 1);
  }

  function handleMoreClick2_2_2() {
    setShowMore(!showMore);
  }

  let sculpture2_2_2 = sculptureList2_2_2[index];
  return (
    <>
      <button onClick={handleNextClick2_2_2}>
        Next
      </button>
      <h2>
        <i>{sculpture2_2_2.name} </i> 
        by {sculpture2_2_2.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList2_2_2.length})
      </h3>
      <button onClick={handleMoreClick2_2_2}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture2_2_2.description}</p>}
      <img 
        src={sculpture2_2_2.url} 
        alt={sculpture2_2_2.alt}
      />
    </>
  );
}


import {Gallery2_2_3} from './Add_others.js';

export function Page2_2_3() {
  return (
    <div className="Page">
      <Gallery2_2_3 />
      <Gallery2_2_3 />
    </div>
  );
}



