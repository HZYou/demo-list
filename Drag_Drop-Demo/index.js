const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        // 获取当前拖动位置之后的元素
        const afterElement = getDragAfterElement(container, e.clientY);
        // 获取拖动元素
        const draggable = document.querySelector('.dragging');
        console.log(afterElement);
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }

        // container.appendChild(draggable);
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    console.log(draggableElements);
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) { //当前拖动位置在该元素的上方
            return { offset: offset, element: child }   // 返回最近的元素
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}