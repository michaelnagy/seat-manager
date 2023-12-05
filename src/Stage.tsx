import { useState } from "react";
import styled from "styled-components";

type Table = {
  tableId: string;
  seats: string[];
};

type SeatGroup = {
  groupId: string;
  seats: string[];
};

type SeatProps = {
  id: string;
  onSelect: (id: string) => void;
  selectedSeats: string[];
};

const StyledTable = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
`;

const TableLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledSeatGroup = styled.div`
  border: 1px dashed #aaa;
  padding: 10px;
  margin: 10px;
`;

const StyledStage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// helper function to check if a seat is selected
const isSeatSelected = (seatId: string, selectedSeats: string[]) => {
  return selectedSeats.includes(seatId);
};

const StyledSeat = styled.button<{ isSelected: boolean }>`
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  margin: 5px;
  color: ${(props) => (props.isSelected ? "white" : "black")}; // Change text color based on selection
  background-color: ${(props) => (props.isSelected ? "#4CAF50" : "#f0f0f0")};
  transition: transform 0.2s; // Add transition for smooth effect
  &:hover {
    transform: scale(1.1); // Scale up the seat on hover
  }
`;

const Seat = ({ id, onSelect, selectedSeats }: SeatProps) => {
  const isSelected = isSeatSelected(id, selectedSeats);
  return (
    <StyledSeat isSelected={isSelected} onClick={() => onSelect(id)}>
      {id}
    </StyledSeat>
  );
};

type TableProps = {
  tableId: string;
  seats: string[];
  onSelect: (id: string) => void;
  selectedSeats: string[];
};

const Table = ({ tableId, seats, selectedSeats, onSelect }: TableProps) => {
  return (
    <StyledTable className={`table-${tableId}`}>
      <TableLabel>Table {tableId}</TableLabel>
      <div className="table-seats">
        {seats.map((seatId) => (
          <Seat key={seatId} id={seatId} selectedSeats={selectedSeats} onSelect={onSelect} />
        ))}
      </div>
    </StyledTable>
  );
};

type SeatGroupProps = {
  groupId: string;
  seats: string[];
  selectedSeats: string[]; // Include selectedSeats in the props type
  onSelect: (id: string) => void;
};

const SeatGroup = ({ groupId, seats, selectedSeats, onSelect }: SeatGroupProps) => {
  return (
    <StyledSeatGroup className={`group-${groupId}`}>
      {seats.map((seatId) => (
        <Seat key={seatId} id={seatId} selectedSeats={selectedSeats} onSelect={onSelect} />
      ))}
    </StyledSeatGroup>
  );
};

type StageProps = {
  tables: Table[];
  seatGroups: SeatGroup[];
};

const Stage = ({ tables, seatGroups }: StageProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const onSelect = (seatId: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      // Check if the seat is already selected
      if (prevSelectedSeats.includes(seatId)) {
        // If selected, remove it from the selectedSeats array
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        // If not selected, add it to the selectedSeats array
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  console.log(selectedSeats);

  return (
    <StyledStage>
      {tables.map((table) => (
        <Table key={table.tableId} {...table} selectedSeats={selectedSeats} onSelect={onSelect} />
      ))}
      {seatGroups.map((group) => (
        <SeatGroup key={group.groupId} {...group} selectedSeats={selectedSeats} onSelect={onSelect} />
      ))}
    </StyledStage>
  );
};

export default Stage;
