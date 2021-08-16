import {
    Line
} from './shapes/index.js';
import { checkCollision } from './utils/collision.js';

class CanvasPainter {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.shapes = [];
        this._initTimer();
    }

    addLine(opts) {
        opts.unique_id = this.shapes.length;
        let line = new Line(opts, this);
        this.shapes.push(line);
        this._paint(line, true);
        return line;
    }

    _paint(shape, force = false) {
        if (!force && !shape.is_dirty) return;
        switch(shape.type) {
            case 'Line':
                let start = shape.start,
                    end = shape.end;
                this.ctx.beginPath();
                this.ctx.moveTo(start[0] + shape.offset_x, this.height - start[1] - shape.offset_y);
                this.ctx.lineTo(end[0] + shape.offset_x, this.height - end[1] - shape.offset_y);
                this.ctx.stroke();
                break;
        }
        shape.is_dirty = false;
    }

    _initTimer() {
        let fn = () => {
            if (this.shapes.length === 0) {
                return;
            }

            // 遍历 shape  找出所有脏 shape  计算得出最小脏区
            let min_x = Infinity, max_x = 0, min_y = Infinity, max_y = 0;
            let dirty_shapes = [];
            for (let shape of this.shapes) {
                if (shape.is_dirty) {
                    dirty_shapes.push(shape);
                    min_x = Math.min(shape.bbox.min_x - 1, min_x);
                    max_x = Math.max(shape.bbox.max_x + 1, max_x);
                    min_y = Math.min(shape.bbox.min_y - 1, min_y);
                    max_y = Math.max(shape.bbox.max_y + 1, max_y);
                }
            }
            let force_dirty_shapes = [];
            for (let dirty_shape of dirty_shapes) {
                for (let shape of this.shapes) {
                    if (checkCollision(dirty_shape, shape)) {
                        if (!shape.is_dirty) {
                            force_dirty_shapes.push(shape);
                            min_x = Math.min(shape.bbox.min_x - 1, min_x);
                            max_x = Math.max(shape.bbox.max_x + 1, max_x);
                            min_y = Math.min(shape.bbox.min_y - 1, min_y);
                            max_y = Math.max(shape.bbox.max_y + 1, max_y);
                        }
                    }
                }
            }

            // 更新由 animate 导致的参数改变
            for (let shape of this.shapes) {
                if (shape.update_fn) {
                    shape.update_fn();
                }
            }

            // 擦掉脏区  重新绘制所有脏 shape
            if (dirty_shapes.length !== 0) {
                this.ctx.clearRect(min_x, this.height - max_y, max_x - min_x, max_y - min_y);
                for (let shape of dirty_shapes) {
                    this._paint(shape);
                }
                for (let shape of force_dirty_shapes) {
                    this._paint(shape, true);
                }
            }

            this.raf = window.requestAnimationFrame(fn);
        };

        this.raf = window.requestAnimationFrame(fn);
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
    }
}

export { CanvasPainter };