import { Shape } from './shape.js';

class Line extends Shape {
    /**
     * @param {*} opts.start - 线段起点
     * @param {*} opts.end - 线段终点
     */
    constructor(opts, canvas_painter) {
        super(opts, canvas_painter);
        this.type = 'Line';
        this.start = opts.start || [0, 0];
        this.end = opts.end || [100, 0];
        this._updateBBox();
    }

    _updateBBox() {
        if (this.bbox === undefined) {
            this.bbox = {
                min_x: 0,
                max_x: 0,
                min_y: 0,
                max_y: 0
            };
        }
        this.bbox.min_x = Math.min(this.start[0], this.end[0]) + this.offset_x;
        this.bbox.max_x = Math.max(this.start[0], this.end[0]) + this.offset_x;
        this.bbox.min_y = Math.min(this.start[1], this.end[1]) + this.offset_y;
        this.bbox.max_y = Math.max(this.start[1], this.end[1]) + this.offset_y;
    }
}

export { Line };