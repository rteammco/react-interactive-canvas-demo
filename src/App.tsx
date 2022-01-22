import { useEffect, useRef, useState } from 'react';
import './App.css';

interface Point2D {
  x: number;
  y: number;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  useEffect(() => {
    requestAnimationFrame(renderFrame);
  }, [cursorPosition]);

  function renderFrame(): void {
    const context = canvasRef.current?.getContext('2d');
    if (context != null) {
      clearBackground(context);
      drawCircle(context, cursorPosition.x, cursorPosition.y);
    }
  }

  function clearBackground(context: CanvasRenderingContext2D): void {
    const { width, height } = context.canvas;
    context.rect(0, 0, width, height);
    context.fillStyle = 'black';
    context.fill();
  }

  function drawCircle(context: CanvasRenderingContext2D, xPos: number, yPos: number): void {
    context.beginPath();
    context.arc(xPos, yPos, 10, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
  }

  function handleMouseMoved(event: React.MouseEvent<Element, MouseEvent>): void {
    const canvas = canvasRef.current;
    if (canvas == null) {
      return;
    }
    const canvasBoundingRect = canvas.getBoundingClientRect();
    const cursorXPos = event.clientX - canvasBoundingRect.left;
    const cursorYPos = event.clientY - canvasBoundingRect.top;
    setCursorPosition({ x: cursorXPos, y: cursorYPos });
  }

  return (
    <div className="App">
      <h1>React - Interactive Canvas Demo</h1>
      <canvas ref={canvasRef} height={480} width={720} onMouseMove={handleMouseMoved}>
        Oops! Your browser doesn't support the canvas component.
      </canvas>
    </div>
  );
}

export default App;
