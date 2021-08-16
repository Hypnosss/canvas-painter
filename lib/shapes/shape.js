class Shape {
    constructor(opts, canvas_painter) {
        this.canvas_painter = canvas_painter;
        this.unique_id = opts.unique_id;
        this.offset_x = 0;
        this.offset_y = 0;
        // this.scale_x = 1;
        // this.scale_y = 1;
        // this.rotation = 0;
        this.is_dirty = false;
        this.bbox_up_to_date = true;
    }

    animate(animated_val_type, animated_val, time, is_loop = false) {
        this._registerAnimation(time, is_loop, (progress) => {
            if (animated_val_type === 'offset') {
                this.offset_x = animated_val[0] * progress;
                this.offset_y = animated_val[1] * progress;
            }
        });
    }

    _registerAnimation(time, is_loop = false, on_update, on_end) {
        let start_timestamp;
        let update_fn = () => {
            if (start_timestamp === undefined) {
                start_timestamp = Date.now();
            }
            let diff_time = Date.now() - start_timestamp;
            let progress = Math.min(1, diff_time / time);

            if (progress < 1) {
                if (on_update && typeof(on_update) === 'function') {
                    on_update(progress);
                }
                if (progress !== 0) {
                    this.is_dirty = true;
                    if (this.bbox_up_to_date) {
                        this._updateBBox();
                    }
                }
                this.is_dirty = progress !== 0;
            } else {
                if (on_end && typeof(on_end) === 'function') {
                    on_end();
                }
                if (is_loop) {
                    start_timestamp = undefined;
                } else {
                    delete this.update_fn;
                }
            }
        };
        this.update_fn = update_fn;
    }
}

export { Shape };