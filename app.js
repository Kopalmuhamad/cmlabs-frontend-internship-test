fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'text-center', 'rounded-md', 'overflow-hidden', 'pb-3', 'cursor-pointer', 'hover:shadow-xl', 'transition-all', 'duration-300');

      categoryDiv.innerHTML = `
        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-52 object-cover rounded-md">
        <h2 class="text-xl font-bold mt-2">${category.strCategory}</h2>
      `;

      categoryDiv.addEventListener('click', () => {
        window.location.href = `/public/category.html?category=${category.strCategory}`;
      });

      categoriesContainer.appendChild(categoryDiv);
    });
  })
  .catch(error => console.error('Error fetching categories:', error));
