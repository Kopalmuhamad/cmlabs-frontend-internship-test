const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('mealId');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0];
    const breadcrumbMeal = document.getElementById('breadcrumb-meal');
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    const mealArea = document.getElementById('meal-area');
    const mealDetail = document.getElementById('meal-detail');
    const mealImage = document.getElementById('meal-image');
    const mealVideo = document.getElementById('meal-video');

    breadcrumbMeal.innerHTML = meal.strMeal;
    breadcrumbCategory.innerHTML = `
            <a href="category.html?category=${meal.strCategory}" class="hover:underline" id="breadcrumb-category">
            ${meal.strCategory}
            </a>`;
    mealArea.innerHTML = meal.strArea;
    mealImage.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="aspect-square md:w-full md:h-full object-cover rounded-md mb-5">`;

    mealDetail.innerHTML = `
      <h1 class="text-3xl font-bold">${meal.strMeal}</h1>
      <p class="mt-3">${meal.strInstructions}</p>
      <h2 class="text-2xl font-bold mt-5">Recipe</h2>
      <ul class="list-disc list-inside mt-2">
        ${getIngredients(meal).map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    `;

    mealVideo.innerHTML = `
    <h1 class="text-3xl font-bold">Tutorials</h1>
    <iframe width="100%" class="h-full" src="https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}" frameborder="0" allowfullscreen></iframe>
    `;
  })
  .catch(error => console.error('Error fetching meal detail:', error));

function getIngredients(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }
  return ingredients;
}
