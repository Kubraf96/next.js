"use client";

import { useEffect } from "react";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We could not load content from WordPress.</p>
      <button onClick={() => retry()}>Try again</button>
    </main>
  );
}
