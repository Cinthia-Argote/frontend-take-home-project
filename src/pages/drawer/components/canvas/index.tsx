import { configCanvas } from "@/config/canvas";
import { ModeCanvas } from "@/enums";
import { useRef, useState, useEffect, MouseEvent, FC } from "react";

interface DrawerCanvasProps {
  color: string;
  mode: ModeCanvas;
}

const Canvas: FC<DrawerCanvasProps> = ({
  color = "black",
  mode = ModeCanvas.DRAW,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const hasInput = useRef(false);

  const onClickCanvas = (e: MouseEvent) => {
    if (mode !== ModeCanvas.TEXT) return;
    if (hasInput.current) return;
    addInput(
      e.clientX,
      e.clientY,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (mode !== ModeCanvas.TEXT) {
          hasInput.current = false;
        }

        const config = configCanvas[mode];
        ctx.lineWidth = config.lineWidth;
        ctx.globalCompositeOperation = config.operation;
        canvas.style.cursor = config.cursor;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, color]);

  const addInput = (x: number, y: number, offX: number, offY: number) => {
    const input = document.createElement("input");

    input.type = "text";
    input.style.position = "fixed";
    input.style.left = x - 4 + "px";
    input.style.top = y - 4 + "px";
    hasInput.current = true;

    input.onkeydown = (e) => handleEnter(e, input, offX, offY);

    document.body.appendChild(input);

    input.focus();
  };

  const handleEnter = (
    e: KeyboardEvent,
    input: HTMLInputElement,
    offsetX: number,
    offsetY: number
  ) => {
    var keyCode = e.keyCode;

    if (keyCode === 13) {
      drawText(input.value, offsetX, offsetY);
      document.body.removeChild(input);
      hasInput.current = false;
    }
  };

  const drawText = (txt: string, x: number, y: number) => {
    if (context) {
      context.textBaseline = "top";
      context.textAlign = "left";
      context.font = "14px sans-serif";
      context.fillText(txt, x - 4, y - 4);
    }
  };

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(event);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.beginPath();
    }
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onClick={onClickCanvas}
    />
  );
};

export default Canvas;
