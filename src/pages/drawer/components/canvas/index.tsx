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
    e.preventDefault();
    e.stopPropagation();
    if (mode === ModeCanvas.DRAW || mode === ModeCanvas.ERASE) return;
    if (hasInput.current) return;
    addInput(e.clientX, e.clientY);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
        ctx.strokeStyle = color;

        if (mode === ModeCanvas.DRAW) {
          ctx.lineWidth = 2;
          ctx.globalCompositeOperation = "source-over";
          canvas.style.cursor = "url('/pencil.svg') 50 50, auto";
          hasInput.current = false;
        }

        if (mode === ModeCanvas.ERASE) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineWidth = 30;
          canvas.style.cursor = "url('/eraser.svg') 60 60, auto";
          hasInput.current = false;
        }

        if (mode === ModeCanvas.TEXT) {
          ctx.lineWidth = 2;
          canvas.style.cursor = "url('/inputText.svg') 50 50, auto";
          ctx.globalCompositeOperation = "source-over";
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, color]);

  const addInput = (x: number, y: number) => {
    const input = document.createElement("input");

    input.type = "text";
    input.style.position = "fixed";
    input.style.left = x - 4 + "px";
    input.style.top = y - 4 + "px";
    hasInput.current = true;

    input.onkeydown = (e) => handleEnter(e, input);

    document.body.appendChild(input);

    input.focus();
  };

  const handleEnter = (e: KeyboardEvent, input: HTMLInputElement) => {
    var keyCode = e.keyCode;

    if (keyCode === 13) {
      drawText(
        input.value,
        parseInt(input.style.left, 10),
        parseInt(input.style.top, 10)
      );
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
