import React from "react";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";

const MissionModel = ({ isOpen, onClose, waypoints }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Mission Planner</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Waypoint</th>
              <th className="border border-gray-300 px-4 py-2">Coordinates</th>
              <th className="border border-gray-300 px-4 py-2">Distance (m)</th>
            </tr>
          </thead>
          <tbody>
            {waypoints.map((wp, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">WP({index.toString().padStart(2, "0")})</td>
                <td className="border border-gray-300 px-4 py-2">{wp.coordinates.join(", ")}</td>
                <td className="border border-gray-300 px-4 py-2">{wp.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default MissionModel;