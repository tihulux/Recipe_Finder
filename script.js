const searchButton = document.getElementById('searchBtn');
const cocList = document.getElementById('coc');
const cocDetails = document.querySelector('.coc-content');
const closeButton = document.getElementById('recipeCloseBtn');

searchButton.addEventListener('click', getCocList);
cocList.addEventListener('click', getCocRecipe);
recipeCloseBtn.addEventListener('click', () => {
  cocDetails.parentElement.classList.remove('showRecipe');
});

function getCocList() {
  let searchInputText = document.getElementById('searchInput').value.trim();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      if (data.drinks) {
        data.drinks.forEach((drink) => {
          html += `
            <div class="coc-item" data-id = ${drink.idDrink}>
              <div class="coc-img">
                <img src="${drink.strDrinkThumb}" alt="drnk" />
              </div>
              <div class="cocName">
                <h3>${drink.strDrink}</h3>
                <a href="#" class="get-recipe">Get Recipe</a>
              </div>
            </div>
            `;
        });
      } else {
        html = '404 NOT FOUND';
      }
      cocList.innerHTML = html;
    });
}

function getCocRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('get-recipe')) {
    let cocItem = e.target.parentElement.parentElement;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocItem.dataset.id}
    `)
      .then((response) => response.json())
      .then((data) => cocRecipeModal(data.drinks));
  }
}

function cocRecipeModal(coc) {
  console.log(coc);
  coc = coc[0];
  let html = `<h2 class="recipe-title">${coc.strDrink}</h2>
  <p class="recipe category">${coc.strCategory}</p>
  <div class="recipe-desc">
    <h3>Instructions:</h3>
    <p>
      ${coc.strInstructions}
    </p>
  </div>
  <div class="coc-recipe-img">
    <img src="${coc.strDrinkThumb}" alt="" />
  </div>
  <div class="ingredients">
            <h3>Ingredients : </h3> 
              <div class="ing1">${coc.strIngredient1}</div>
              <div class="ing2">${coc.strIngredient2}</div>
              <div class="ing3">${coc.strIngredient3}</div>
              <div class="ing4">${coc.strIngredient4}</div>
              <div class="ing5">${coc.strIngredient5}</div>
            </div>`;
  cocDetails.innerHTML = html;
  cocDetails.parentElement.classList.add('showRecipe');
}
