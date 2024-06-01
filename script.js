const meals = document.getElementById("meal");
getRandomMeal();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const mealData = await meal.json();
  return mealData.meals[0];
}

async function getMealBySearch(term) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const mealsData = await meals.json();
  return mealsData.meals;
}

function addMeal(mealData, random = false) {
  console.log(mealData);
  const meal = document.createElement("div");
  meal.classList.add("meal");
  //   meal.innerHTML = " hello world"
  meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random">Random Recipe</span>` : ""}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>
  `;
  btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", (e) => {
   btn.classList.toggle("active");
  });
  meals.appendChild(meal);
}
