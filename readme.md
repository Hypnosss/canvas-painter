**一个简单的 canvas 绘图库。**

```javascript
let canvas_painter = new CanvasPainter(canvas);

let line = canvas_painter.addLine({
    start: [10, 20],
    end: [800, 20]
});
line.animate('offset', [0, 100], 3000, false);
```

####TODO
- 支持更多图形
   - rect
   - circle
   - path
- 支持更多 transform 方式
   - rotate
   - scale
- 支持多级（group）
- 支持类似 z-index 的分层
- 更换引入方法