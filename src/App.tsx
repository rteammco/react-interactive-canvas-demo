import { useState } from 'react';
import './App.css';
import AnimatedCanvas from './components/AnimatedCanvas';
import InputGrid from './components/InputGrid';
import { Point2D } from './utils/Point2D';

function App() {
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  const gridValues = [
    ['a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p'],
  ];

  return (
    <div className="App">
      <h1>React - Interactive Canvas Demo</h1>
      <AnimatedCanvas cursorPosition={cursorPosition} onCursorPositionChanged={setCursorPosition} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
        <InputGrid gridSize={4} gridValues={gridValues} />
      </div>
    </div>
  );
}

export default App;
