const checkCollision = function(shape1, shape2) {
    if (shape1.bbox.min_x > shape2.bbox.max_x ||
        shape1.bbox.max_x < shape2.bbox.min_x ||
        shape1.bbox.min_y > shape2.bbox.max_y ||
        shape1.bbox.max_y < shape2.bbox.min_y
        ) {
            return false;
        }
    return true;
}

export { checkCollision };