export const checkTarget = ({ clientX, clientY }, targets, callback) => {
    callback(
        targets.find(
            target =>
                !target.isShot &&
                clientX > target.x &&
                clientX < target.x + target.width &&
                clientY > target.y &&
                clientY < target.y + target.height
        )
    )
}
