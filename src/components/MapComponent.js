import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Draw } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import "ol/ol.css";
import "tailwindcss/tailwind.css";

const MapComponent = ({ onCoordinatesChange, onPolygonComplete }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [lineSource] = useState(new VectorSource());
  const [polygonSource] = useState(new VectorSource());

  useEffect(() => {
    // Initialize Map
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: lineSource }),
        new VectorLayer({ source: polygonSource }),
      ],
      view: new View({ center: [0, 0], zoom: 2 }),
    });

    setMap(initialMap);
    return () => initialMap.setTarget(null);
  }, [lineSource, polygonSource]);

  const startDrawing = (type) => {
    const draw = new Draw({ source: type === "LineString" ? lineSource : polygonSource, type });
    map.addInteraction(draw);

    draw.on("drawend", (event) => {
      const coordinates = event.feature.getGeometry().getCoordinates();
      if (type === "LineString") onCoordinatesChange(coordinates);
      if (type === "Polygon") onPolygonComplete(coordinates);
      map.removeInteraction(draw);
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 px-4 md:px-8 lg:px-16">
      <div
        ref={mapRef}
        className="w-full h-96 border-2 border-gray-300 rounded-lg shadow-md"
      ></div>
      <div className="flex flex-wrap justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={() => startDrawing("LineString")}
        >
          Draw LineString
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
          onClick={() => startDrawing("Polygon")}
        >
          Draw Polygon
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
