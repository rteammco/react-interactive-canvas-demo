import { useState } from 'react';
import './App.css';
import AnimatedCanvas from './components/AnimatedCanvas';
import InputGrid from './components/InputGrid';
import { Point2D } from './utils/Point2D';

function App() {
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  return (
    <div className="App">
      <h1>React - Interactive Canvas Demo</h1>
      <AnimatedCanvas cursorPosition={cursorPosition} onCursorPositionChanged={setCursorPosition} />
      <InputGrid gridSize={4} />
      <InputGrid gridSize={4} />
      <InputGrid gridSize={4} />
      <InputGrid gridSize={4} />
      <InputGrid gridSize={4} />
    </div>
  );
}

export default App;
