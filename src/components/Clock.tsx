import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';

function Clock() {
  const [ now, setNow ] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [now]);

  return (
    <>{format(now, 'H:mm:ss')}</>
  );
}

export default Clock;