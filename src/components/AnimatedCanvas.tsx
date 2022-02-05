import { useEffect, useRef } from 'react';
import { Point2D } from '../utils/Point2D';

const ANIMATION_SPEED = 0.005;

interface AnimationState {
  cursorPosition: Point2D;
  isCursorLocked: boolean;
  lastRenderTime: number;
  revolvingCircleRotation: number;
}

interface Props {
  cursorPosition: Point2D;
  onCursorPositionChanged: (position: Point2D) => void;
}

export default function AnimatedCanvas({ cursorPosition, onCursorPositionChanged }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animationStateRef = useRef<AnimationState>({
    cursorPosition,
    isCursorLocked: false,
    lastRenderTime: Date.now(),
    revolvingCircleRotation: 0,
  });

  const animationFrameRequestRef = useRef<number | null>(null);

  useEffect(() => {
    animationStateRef.current.lastRenderTime = Date.now();
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame);
    return () => {
      if (animationFrameRequestRef.current != null) {
        cancelAnimationFrame(animationFrameRequestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animationStateRef.current.isCursorLocked) {
      updateAnimationState({ cursorPosition });
    }
  }, [cursorPosition]);

  function updateAnimationState(animationStateUpdates: Partial<AnimationState>): void {
    animationStateRef.current = {
      ...animationStateRef.current,
      ...animationStateUpdates,
    };
  }

  function renderFrame(): void {
    const context = canvasRef.current?.getContext('2d');
    if (context != null) {
      const { cursorPosition, lastRenderTime } = animationStateRef.current;
      const timeNow = Date.now();
      const deltaTime = timeNow - lastRenderTime;
      clearBackground(context);
      drawMainCircle(context, cursorPosition.x, cursorPosition.y);
      drawRevolvingCircles(context, cursorPosition.x, cursorPosition.y, deltaTime);
      updateAnimationState({ lastRenderTime: timeNow });
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
    let { revolvingCircleRotation } = animationStateRef.current;
    revolvingCircleRotation += deltaTime * ANIMATION_SPEED;
    if (revolvingCircleRotation > 2 * Math.PI) {
      revolvingCircleRotation -= 2 * Math.PI;
    }
    updateAnimationState({ revolvingCircleRotation });
    drawRevolvingCircle(context, xPos, yPos, -revolvingCircleRotation, 'blue');
    drawRevolvingCircle(context, xPos, yPos, -revolvingCircleRotation * 2, 'cyan', 40);
    drawRevolvingCircle(context, xPos, yPos, revolvingCircleRotation, 'green', 30);
    drawRevolvingCircle(context, xPos, yPos, revolvingCircleRotation + Math.PI, 'yellow');
    drawRevolvingCircle(context, xPos, yPos, revolvingCircleRotation * 2, 'purple', 60);
  }

  function drawRevolvingCircle(
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number,
    rotation: number,
    fillStyle: string,
    radius: number = 20
  ): void {
    const xOffset = radius * Math.cos(rotation);
    const yOffset = radius * Math.sin(rotation);
    context.beginPath();
    context.arc(xPos + xOffset, yPos + yOffset, 5, 0, Math.PI * 2);
    context.fillStyle = fillStyle;
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

  function handleMouseClicked(): void {
    updateAnimationState({ isCursorLocked: !animationStateRef.current.isCursorLocked });
  }

  return (
    <canvas
      ref={canvasRef}
      height={480}
      width={720}
      onClick={handleMouseClicked}
      onMouseMove={handleMouseMoved}
    >
      Oops! Your browser doesn't support the canvas component.
    </canvas>
  );
}
