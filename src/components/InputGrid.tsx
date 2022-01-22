function InputCell() {
  return <input />;
}

interface Props {
  gridSize: number;
}

export default function InputGrid({ gridSize }: Props) {
  const gridRows = [];
  for (let i = 0; i < gridSize; i++) {
    const gridColumns = [];
    for (let j = 0; j < gridSize; j++) {
      gridColumns.push(<InputCell key={`cell_${i}_${j}`} />);
    }
    gridRows.push(<div key={`row_${i}`}>{gridColumns}</div>);
  }

  return <div>{gridRows}</div>;
}
