import { Actor } from "./Actor";

import mario_spritesheet from "../assets/Mario.png";

export class Mario extends Actor {
  public mario_img?: HTMLImageElement;
  public frame_count = 0;
  update(delta: number) {}

  initialize() {
    this.mario_img = new Image();
    // esta linea es la que carga la imagen
    this.mario_img.src = mario_spritesheet;

    // esto es para comprobar que la imagen se ha cargado correctamente
    this.mario_img.onload = () => {
      console.log("Mario image loaded");
    };
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    // Move to Actor origin
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    //https://github.com/iluuu1994/Super-Mario-Bros/blob/master/Resources/sprite%20sheets/creatures/mario/Mario.plist
    const mario_frames = [
      { src_origin: { x: 4, y: 164 }, size: { x: 14, y: 15 } },
      { src_origin: { x: 4, y: 212 }, size: { x: 12, y: 16 } },
      { src_origin: { x: 28, y: 208 }, size: { x: 16, y: 16 } },
    ];

    // este if es por si la imagen no se ha cargado
    if (this.mario_img) {
      // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
      let i = Math.floor(this.frame_count * 10);
      let frame = mario_frames[i % mario_frames.length];
      let scale = 10;
      ctx.drawImage(
        this.mario_img,
        frame.src_origin.x,
        frame.src_origin.y,
        frame.size.x,
        frame.size.y,
        0,
        0,
        frame.size.x * scale,
        frame.size.y * scale
      );
    } else {
      // Draw the super mario actor
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 100, 100);
    }

    ctx.restore();

    this.frame_count += delta;
  }
}
