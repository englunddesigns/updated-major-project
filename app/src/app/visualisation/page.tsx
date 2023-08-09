import Script from "next/script";
import NavBar from "../components/navbar";

export default function Visualisation() {
  return (
    <main className="flex min-h-screen w-full bg-white flex-col items-center">
      <NavBar />
      <div id="map" className="w-full h-full">
        <svg id="svg" viewBox="0 0 1000 1000"></svg>
      </div>
      <div className="zoom">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full"
          id="zoomin"
        >
          +
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full"
          id="zoomout"
        >
          -
        </button>
      </div>
      <Script src="https://d3js.org/d3.v3.js" />
      <Script src="https://d3js.org/d3.v4.js" />
      <Script src="https://d3js.org/topojson.v1.min.js" />
      <Script src="/static/d3/scrolling.js" />
      <Script src="/static/d3/map.js" />
    </main>
  );
}
