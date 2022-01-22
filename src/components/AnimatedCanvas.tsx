import { useEffect, useRef } from 'react';
import { Point2D } from '../utils/Point2D';

interface Props {
  cursorPosition: Point2D;
  onCursorPositionChanged: (position: Point2D) => void;
}

export default function AnimatedCanvas({ cursorPosition, onCursorPositionChanged }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    onCursorPositionChanged({ x: cursorXPos, y: cursorYPos });
  }

  return (
    <canvas ref={canvasRef} height={480} width={720} onMouseMove={handleMouseMoved}>
      Oops! Your browser doesn't support the canvas component.
    </canvas>
  );
}
