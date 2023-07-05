function registerTagsClickEvents(tagsElements, selectionList, filterData) {
    tagsElements.forEach(tag => {
        tag.addEventListener('click', event => {
            const selected = event.target.textContent.trim();
            const isSelected = event.target.classList.contains('selected');

            if (isSelected && selectionList.size === 1) {
                // Prevent deselection if only one item is selected
                return;
            }

            event.target.classList.toggle('selected');

            if (event.target.classList.contains('selected')) {
                selectionList.add(selected);
            } else {
                selectionList.delete(selected);
            }

            filterData();
        });
    });
}


export { registerTagsClickEvents };
