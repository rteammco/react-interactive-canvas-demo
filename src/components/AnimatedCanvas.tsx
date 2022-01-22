import { useEffect, useRef } from 'react';
import { Point2D } from '../utils/Point2D';

interface Props {
  cursorPosition: Point2D;
  onCursorPositionChanged: (position: Point2D) => void;
}

export default function AnimatedCanvas({ cursorPosition, onCursorPositionChanged }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cursorPositionRef = useRef<Point2D>(cursorPosition);
  cursorPositionRef.current = cursorPosition;

  const revolvingCircleRotationRef = useRef<number>(0);

  const animationFrameRequestRef = useRef<number | null>(null);
  const lastRenderTime = useRef<number>(Date.now());

  useEffect(() => {
    lastRenderTime.current = Date.now();
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animationFrameRequestRef.current != null) {
        cancelAnimationFrame(animationFrameRequestRef.current);
      }
    };
  }, []);

  function renderFrame(): void {
    const context = canvasRef.current?.getContext('2d');
    if (context != null) {
      const timeNow = Date.now();
      const deltaTime = timeNow - lastRenderTime.current;
      lastRenderTime.current = timeNow;
      clearBackground(context);
      drawMainCircle(context, cursorPositionRef.current.x, cursorPositionRef.current.y);
      drawRevolvingCircles(
        context,
        cursorPositionRef.current.x,
        cursorPositionRef.current.y,
        deltaTime
      );
    }
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame);
  }

  function clearBackground(context: CanvasRenderingContext2D): void {
    const { width, height } = context.canvas;
    context.rect(0, 0, width, height);
    context.fillStyle = 'black';
    context.fill();
  }

  function drawMainCircle(context: CanvasRenderingContext2D, xPos: number, yPos: number): void {
    context.beginPath();
    context.arc(xPos, yPos, 10, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
  }

  function drawRevolvingCircles(
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number,
    deltaTime: number
  ): void {
    revolvingCircleRotationRef.current += deltaTime * 0.01;
    if (revolvingCircleRotationRef.current > 2 * Math.PI) {
      revolvingCircleRotationRef.current -= 2 * Math.PI;
    }
    const xOffsetClockwise = 20 * Math.sin(-revolvingCircleRotationRef.current);
    const yOffsetClockwise = 20 * Math.cos(-revolvingCircleRotationRef.current);
    context.beginPath();
    context.arc(xPos + xOffsetClockwise, yPos + yOffsetClockwise, 5, 0, Math.PI * 2);
    context.fillStyle = 'blue';
    context.fill();
    const xOffsetCounterclockwise = 20 * Math.sin(revolvingCircleRotationRef.current * 2);
    const yOffsetCounterclockwise = 20 * Math.cos(revolvingCircleRotationRef.current * 2);
    context.beginPath();
    context.arc(xPos + xOffsetCounterclockwise, yPos + yOffsetCounterclockwise, 5, 0, Math.PI * 2);
    context.fillStyle = 'green';
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
