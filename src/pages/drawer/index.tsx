import { useState } from "react";
import Canvas from "./components/canvas";
import Actions from "./components/actions";
import styles from "./styles/index.module.css";
import { ModeCanvas } from "@/enums";

const Drawer = () => {
  const [mode, setMode] = useState<ModeCanvas>(ModeCanvas.DRAW);
  const [color, setColor] = useState("black");

  return (
    <div className={styles.container}>
      <Actions setColor={setColor} setMode={setMode} mode={mode} />
      <Canvas color={color} mode={mode} />
    </div>
  );
};

export default Drawer;
