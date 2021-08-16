import { CanvasPainter } from "./lib/main.js";

const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 800;
canvas.height = 600;

let canvas_painter = new CanvasPainter(canvas);

let line = canvas_painter.addLine({
    start: [10, 20],
    end: [800, 20]
});
line.animate('offset', [0, 100], 3000, false);

for (let i = 1; i < 800; i+=3) {
    canvas_painter.addLine({
        start: [i, 20],
        end: [i, 120]
    });
    canvas_painter.addLine({
        start: [i, 20],
        end: [i + 10, 120]
    });
}