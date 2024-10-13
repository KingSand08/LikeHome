import { Suspense } from "react";

export default function HomePage() {
  const hotels = ["a", "b", "c"];
  return (
    <main className="">
      Main Page
      {hotels.map((hotel) => (
        <Suspense fallback={<h1>loading...</h1>}>
          {/* Allows hotels to be loaded individually and not impede the first contentful paint*/}
          <div key={hotel}>{hotel}</div>
        </Suspense>
      ))}
    </main>
  );
}
