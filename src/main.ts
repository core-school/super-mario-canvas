import { Actor, IActor } from "./actors/Actor";
import { FPSViewer } from "./actors/FPSViewer";
import { Mario } from "./actors/Mario.actor";

window.onload = () => {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Creamos los objetos que representaran los actores de nuestro juego
  let fps = new FPSViewer({ x: 5, y: 15 });
  let mario = new Mario({ x: 100, y: 100 });

  // Declaramos el array de actores
  let actors: Array<IActor> = [fps, mario];
  // Inicializamos los actores si es necesario y está implementada
  // la función initialize en el actor que vamos a pintar
  actors.forEach((a) => a.initialize && a.initialize());

  // Bucle de renderizado
  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;

    lastFrame = time;
    actors.forEach((e) => e.update(delta));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actors.forEach((e) => {
      ctx.save();
      e.draw(delta, ctx);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  document.body.addEventListener("keydown", (e) => {
    // console.log(e.key);
    actors.forEach((actor) => {
      if (actor.keyboard_event_down) {
        actor.keyboard_event_down(e.key);
      }
    });
  });
  document.body.addEventListener("keyup", (e) => {
    // console.log(e.key);
    actors.forEach((actor) => {
      if (actor.keyboard_event_up) {
        actor.keyboard_event_up(e.key);
      }
    });
  });
};
