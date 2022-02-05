const CELL_BORDER_STYLE = '1px solid black';
const CELL_SIZE = 48;

function InputCell({
  isLastCellInRow,
  isLastRow,
  value,
  onValueChanged,
}: {
  isLastCellInRow: boolean;
  isLastRow: boolean;
  value: string;
  onValueChanged: (newValue: string) => void;
}) {
  function handleChangeEvent(e: React.ChangeEvent<HTMLInputElement>): void {
    onValueChanged(e.target.value);
  }

  return (
    <div
      style={{
        alignItems: 'center',
        borderBottom: isLastRow ? CELL_BORDER_STYLE : undefined,
        borderLeft: CELL_BORDER_STYLE,
        borderRight: isLastCellInRow ? CELL_BORDER_STYLE : undefined,
        borderTop: CELL_BORDER_STYLE,
        display: 'flex',
        height: CELL_SIZE,
        justifyContent: 'center',
        width: CELL_SIZE,
      }}
    >
      <input
        value={value}
        style={{
          border: 0,
          fontSize: 18,
          height: CELL_SIZE - 8,
          textAlign: 'center',
          width: CELL_SIZE - 8,
        }}
        onChange={handleChangeEvent}
      />
    </div>
  );
}

interface Props {
  gridSize: number;
  gridValues: string[][];
  onGridValuesChanged: (newGridValues: string[][]) => void;
}

export default function InputGrid({ gridSize, gridValues, onGridValuesChanged }: Props) {
  function onGridValueChanged(row: number, col: number, newValue: string): void {
    const updatedGridValues = [...gridValues];
    updatedGridValues[row][col] = newValue;
    onGridValuesChanged(updatedGridValues);
  }

  const gridRows = [];
  for (let i = 0; i < gridSize; i++) {
    const gridColumns = [];
    for (let j = 0; j < gridSize; j++) {
      gridColumns.push(
        <InputCell
          key={`cell_${i}_${j}`}
          isLastCellInRow={j === gridSize - 1}
          isLastRow={i === gridSize - 1}
          value={gridValues[i][j]}
          onValueChanged={(newValue) => onGridValueChanged(i, j, newValue)}
        />
      );
    }
    gridRows.push(
      <div
        key={`row_${i}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {gridColumns}
      </div>
    );
  }

  return <div style={{ padding: 5 }}>{gridRows}</div>;
}
