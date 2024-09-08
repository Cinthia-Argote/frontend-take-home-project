import styles from "./styles/index.module.css";
import { useState } from "react";
import Canvas from "./components/canvas";
import { ModeCanvas } from "./enums";
import Image from "next/image";

const Drawer = () => {
  const [mode, setMode] = useState<ModeCanvas>(ModeCanvas.DRAW);
  const [color, setColor] = useState("black");

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button onClick={() => setMode(ModeCanvas.DRAW)}>
          <Image src="/pencil.svg" alt="draw" width={50} height={50} />
        </button>
        <button onClick={() => setMode(ModeCanvas.TEXT)}>
          <Image src="/inputText.svg" alt="text" width={50} height={50} />
        </button>
        <button onClick={() => setMode(ModeCanvas.ERASE)}>
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

      <div className={styles.section}>
        <Canvas color={color} mode={mode} />
      </div>
    </div>
  );
};

export default Drawer;
