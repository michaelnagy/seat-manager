import Stage from "./Stage";

function App() {
  return (
    <div>
      <h1>Seat Manager</h1>
      <div className="card">
        <Stage
          tables={[
            { tableId: "1", seats: ["1A", "1B", "1C", "1D"] },
            // ... other tables
          ]}
          seatGroups={[
            { groupId: "A", seats: ["2A", "2B", "2C", "2D"] },
            // ... other seat groups
          ]}
        />
      </div>
    </div>
  );
}

export default App;
