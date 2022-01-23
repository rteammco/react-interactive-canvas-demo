import { useEffect, useMemo, useState } from 'react';
import './App.css';
import AnimatedCanvas from './components/AnimatedCanvas';
import InputGrid from './components/InputGrid';
import { Point2D } from './utils/Point2D';

type GridValues = string[][];

const GRID_SIZE = 6;

function createEmptyGridValues(count: number, gridSize: number): GridValues[] {
  const columns = Array.apply(null, Array(gridSize)).map(() => '');
  const gridValues = [];
  for (let i = 0; i < count; i++) {
    gridValues.push(Array.apply(null, Array(gridSize)).map(() => [...columns]));
  }
  return gridValues;
}

function App() {
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });
  const [gridValues, setGridValues] = useState<GridValues[]>(createEmptyGridValues(12, GRID_SIZE));

  useEffect(() => {
    const newGridValues = [...gridValues[0]];
    newGridValues[0][0] = cursorPosition.x.toString();
    newGridValues[0][1] = cursorPosition.y.toString();
    onGridValuesChanged(0, newGridValues);
  }, [cursorPosition]);

  function onGridValuesChanged(gridIndex: number, newValues: GridValues): void {
    const newGridValues = [...gridValues];
    newGridValues[gridIndex] = newValues;
    setGridValues(newGridValues);
  }

  const inputGrids = useMemo(() => {
    return gridValues.reduce(
      (grids: React.ReactElement[], nextGridValues: GridValues, nextGridIndex: number) => {
        grids.push(
          <InputGrid
            key={`grid_input_${nextGridIndex}`}
            gridSize={GRID_SIZE}
            gridValues={nextGridValues}
            onGridValuesChanged={(newGridValues) =>
              onGridValuesChanged(nextGridIndex, newGridValues)
            }
          />
        );
        return grids;
      },
      []
    );
  }, [gridValues]);

  return (
    <div className="App">
      <h1>React - Interactive Canvas Demo</h1>
      <AnimatedCanvas cursorPosition={cursorPosition} onCursorPositionChanged={setCursorPosition} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {inputGrids.slice(0, 3)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {inputGrids.slice(3, 6)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {inputGrids.slice(6, 9)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {inputGrids.slice(9, 12)}
      </div>
    </div>
  );
}

export default App;
