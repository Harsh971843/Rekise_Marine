import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import MissionModal from "./components/MissionModel";
import PolygonModal from "./components/PolygonModel";

const App = () => {
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [isMissionModalOpen, setMissionModalOpen] = useState(false);
  const [isPolygonModalOpen, setPolygonModalOpen] = useState(false);

  const calculateDistance = (coord1, coord2) => {
    // Implement distance calculation here
    return Math.random() * 100; // Placeholder
  };

  const handleLineCoordinatesChange = (coords) => {
    const waypoints = coords.map((coord, index) => ({
      coordinates: coord,
      distance: index > 0 ? calculateDistance(coords[index - 1], coord) : 0,
    }));
    setLineCoordinates(waypoints);
    setMissionModalOpen(true);
  };

  const handlePolygonComplete = (coords) => {
    setPolygonCoordinates(coords);
    setPolygonModalOpen(true);
  };

  return (
    <div>
      <MapComponent
        onCoordinatesChange={handleLineCoordinatesChange}
        onPolygonComplete={handlePolygonComplete}
      />
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setMissionModalOpen(false)}
        waypoints={lineCoordinates}
      />
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onClose={() => setPolygonModalOpen(false)}
        coordinates={polygonCoordinates}
      />
    </div>
  );
};

export default App;
