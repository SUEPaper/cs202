import React, { useState } from "react";
import { sculptureList2_2_3 } from './Add_data.js';

export function Gallery2_2_3() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick2_2_3() {
    setIndex(index + 1);
  }

  function handleMoreClick2_2_3() {
    setShowMore(!showMore);
  }

  let sculpture2_2_3 = sculptureList2_2_3[index];
  return (
    <section>
      <button onClick={handleNextClick2_2_3}>
        Next
      </button>
      <h2>
        <i>{sculpture2_2_3.name} </i> 
        by {sculpture2_2_3.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList2_2_3.length})
      </h3>
      <button onClick={handleMoreClick2_2_3}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture2_2_3.description}</p>}
      <img 
        src={sculpture2_2_3.url} 
        alt={sculpture2_2_3.alt}
      />
    </section>
  );
}

