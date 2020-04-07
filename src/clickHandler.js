export const checkTarget = ({ clientX, clientY }, targets, callback) => {
    targets.forEach(target => {
        if ((clientX > target.x) && (clientX < target.x + target.width) && (clientY > target.y) && (clientY < target.y + target.height)) {
            callback(target);
        }
    })
}