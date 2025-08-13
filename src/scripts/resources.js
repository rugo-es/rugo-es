/* Filter resources by tag */
const filterItems = document.querySelectorAll('#filterTags .filterTag');
const items = document.querySelectorAll('ul#resourcesCardContainer li');
filterItems.forEach(filterItem => {
    filterItem.addEventListener('click', () => {
        const filter = filterItem.dataset.filter;
        items.forEach(item => {
            const itemCategory = item.dataset.category;
            if (itemCategory !== undefined && itemCategory.split(',').includes(filter)) {
                setTimeout(() => {
                    item.classList.remove('fade');
                    item.classList.remove('d-none');
                }, 300);
            } else {
                item.classList.add('fade');
                setTimeout(() => {
                    item.classList.add('d-none');
                }, 300);
            }
        });
    });
});