const addRemoveIngredientHandler = () => {
  const ingredient = document.querySelector('#ingredient').value.trim();
  const ingredientList = document.querySelector('.ingredientList');

  if (ingredient) {
    const li = document.createElement('li');
    li.textContent = ingredient;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2', 'mb-2');
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(deleteBtn);
    ingredientList.appendChild(li);
    document.querySelector('#ingredient').value = '';
  }
};

const submitRecipeHandler = async (event) => {
  event.preventDefault();

  const recipeName = document.querySelector('#recipe-title').value.trim();
  const description = document.querySelector('#description').value;
  const ingredients = document.querySelectorAll('.ingredientList li');
  const ingredientListArr = Array.from(ingredients).map(li => li.textContent.replace('Delete', '').trim());
  const instructions = document.querySelector('#instructions').value;

  if (recipeName && description && ingredientListArr && instructions) {
    const response = await fetch('/recipe', {
      method: 'POST',
      body: JSON.stringify({
       
        recipe_name: recipeName,
        description: description,
        ingredients: ingredientListArr,
        instructions: instructions
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create recipe');
    }
  }
};

document.querySelector('#addRecipeBtn').addEventListener('click', submitRecipeHandler);
document.querySelector('#addIngredientBtn').addEventListener('click', addRemoveIngredientHandler);