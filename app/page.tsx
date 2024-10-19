<<<<<<< HEAD
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
=======
import { Suspense } from "react";

export default function HomePage() {
  const hotels = ["a", "b", "c"];
  return (
    <main className="">
      Main Page
      {hotels.map((hotel) => (
        <Suspense key={hotel} fallback={<h1>loading...</h1>}>
          {/* Allows hotels to be loaded individually and not impede the first contentful paint*/}
          {/* This is a perfect oppportunity to use https://react.dev/reference/react/Suspense#showing-stale-content-while-fresh-content-is-loading */}
          <div key={hotel}>{hotel}</div>
        </Suspense>
      ))}
    </main>
>>>>>>> b1e34d8c96b2f01bbbb942d90e6cdc400935be25
  );
}
