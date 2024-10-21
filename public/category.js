const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');

document.getElementById('category-title').textContent = categoryName;

// Fetch Meals by Category
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
  .then(response => response.json())
  .then(data => {
    const meals = data.meals;
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    const mealsContainer = document.getElementById('meals');

    breadcrumbCategory.textContent = categoryName; 

    // Pastikan meals ada sebelum di-loop
    if (meals) {
      meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'text-center', 'rounded-md', 'overflow-hidden', 'pb-3', 'cursor-pointer', 'hover:shadow-xl', 'transition-all', 'duration-300');

        mealDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-52 object-cover object-center rounded-md">
          <h2 class="text-xl font-bold mt-2">${meal.strMeal}</h2>
        `;

        mealDiv.addEventListener('click', () => {
          window.location.href = `meal.html?mealId=${meal.idMeal}`;
        });

        mealsContainer.appendChild(mealDiv);
      });
    } else {
      mealsContainer.innerHTML = '<p class="text-center">No meals found in this category.</p>';
    }
  })
  .catch(error => console.error('Error fetching meals:', error));
