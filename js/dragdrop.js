export function initDragAndDrop() {
    const skillWrapper = document.querySelector('.skills-wrapper');
    let draggedItem = null;
    let placeholder = document.createElement('div');
    placeholder.className = 'drag-placeholder';

    skillWrapper.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('icon-card')) {
            draggedItem = e.target;
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => (draggedItem.style.display = 'none'), 0);
        }
    });

    skillWrapper.addEventListener('dragend', () => {
        if (draggedItem) {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
                if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
            }, 0);
        }
    });

    skillWrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        skillWrapper.classList.add('dragover');
        const afterElement = getDragAfterElement(skillWrapper, e.clientX, e.clientY, draggedItem);

        // Remove existing placeholder
        if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);

        if (afterElement == null) {
            skillWrapper.appendChild(placeholder);
        } else {
            skillWrapper.insertBefore(placeholder, afterElement);
        }
    });

    skillWrapper.addEventListener('dragleave', () => {
        skillWrapper.classList.remove('dragover');
        if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
    });

    skillWrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        skillWrapper.classList.remove('dragover');
        const afterElement = getDragAfterElement(skillWrapper, e.clientX, e.clientY, draggedItem);

        // Remove placeholder before inserting
        if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);

        if (afterElement == null) {
            skillWrapper.appendChild(draggedItem);
        } else {
            skillWrapper.insertBefore(draggedItem, afterElement);
        }
    });
}

// Helper to find the icon after which to insert (uses both X and Y for grid/flex freedom)
function getDragAfterElement(container, x, y, draggedItem) {
    const draggableElements = [...container.querySelectorAll('.icon-card:not([style*="display: none"])')].filter(el => el !== draggedItem);
    let closest = { distance: Infinity, element: null };
    draggableElements.forEach(child => {
        const box = child.getBoundingClientRect();
        // Calculate the distance from the mouse to the center of each icon
        const dx = x - (box.left + box.width / 2);
        const dy = y - (box.top + box.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < closest.distance) {
            closest = { distance, element: child };
        }
    });
    return closest.element;
}