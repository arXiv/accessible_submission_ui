document.addEventListener('DOMContentLoaded', function () {
    const categories = document.querySelectorAll('.category-toggle');
    const links = document.querySelectorAll('.left-sidebar a');
    const activeCategoryIndex = getActiveCategory();
  
    // Function to close all categories
  
    // Open the category containing the active link
    if (activeCategoryIndex >= 0) {
      categories[activeCategoryIndex].classList.add('active');
      categories[activeCategoryIndex].nextElementSibling.classList.add('active');
    }
  
    categories.forEach((category) => {
      category.addEventListener('click', function () {
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('active');
        closeAllCategories(this);
      });
    });
  
    links.forEach((link) => {
      link.addEventListener('click', function () {
        links.forEach((otherLink) => otherLink.classList.remove('active'));
        this.classList.add('active');
  
        const currentCategory = this.closest('.category');
        closeAllCategories(currentCategory.querySelector('.category-toggle'));
  
        currentCategory.querySelector('.category-toggle').classList.add('active');
        currentCategory.querySelector('.category-links').classList.add('active');
      });
    });
  });
  