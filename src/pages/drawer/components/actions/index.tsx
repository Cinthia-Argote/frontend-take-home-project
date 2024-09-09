import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.css";
import { ModeCanvas } from "@/enums";

interface ActionsProps {
  setMode: (value: ModeCanvas) => void;
  setColor: (value: string) => void;
  mode: ModeCanvas;
}

const Actions: FC<ActionsProps> = ({ setMode, setColor, mode }) => {
  const getButtonClass = (buttonMode: ModeCanvas) => {
    return mode === buttonMode
      ? `${styles.button} ${styles.buttonActive}`
      : styles.button;
  };
  return (
    <div className={styles.actions}>
      <button
        onClick={() => setMode(ModeCanvas.DRAW)}
        className={getButtonClass(ModeCanvas.DRAW)}
      >
        <Image src="/pencil.svg" alt="draw" width={50} height={50} />
      </button>
      <button
        onClick={() => setMode(ModeCanvas.TEXT)}
        className={getButtonClass(ModeCanvas.TEXT)}
      >
        <Image src="/inputText.svg" alt="text" width={50} height={50} />
      </button>
      <button
        onClick={() => setMode(ModeCanvas.ERASE)}
        className={getButtonClass(ModeCanvas.ERASE)}
      >
        <Image src="/eraser.svg" alt="eraser" width={50} height={50} />
      </button>
      <input
        type="color"
        className={styles.picker}
        onChange={(event) => {
          setColor(event.target.value);
        }}
      ></input>
    </div>
  );
};

export default Actions;
