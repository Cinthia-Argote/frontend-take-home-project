import { ModeCanvas } from "@/enums";

interface CanvasConfig {
  lineWidth: number;
  operation: GlobalCompositeOperation;
  cursor: string;
}

export const configCanvas: {
  [key in ModeCanvas]: CanvasConfig;
} = {
  [ModeCanvas.DRAW]: {
    lineWidth: 2,
    operation: "source-over",
    cursor: "url('/pencil.svg') 50 50, auto",
  },
  [ModeCanvas.ERASE]: {
    lineWidth: 30,
    operation: "destination-out",
    cursor: "url('/eraser.svg') 60 60, auto",
  },
  [ModeCanvas.TEXT]: {
    lineWidth: 2,
    operation: "source-over",
    cursor: "url('/inputText.svg') 50 50, auto",
  },
};
