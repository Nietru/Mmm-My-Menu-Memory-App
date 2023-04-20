const addRemoveIngredientHandler =  () => {
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
  console.log("submit handler")
    if (recipeName && description && instructions) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/recipe/${id}`, {
        method: 'PUT',
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

  const deleteButtons = document.querySelectorAll('.btn-danger');
deleteButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Get the parent li element of the delete button
    const li = this.parentNode;
    // Remove the li element from the ingredient list
    li.parentNode.removeChild(li);
  });
});
  
  document.querySelector('#editRecipeBtn').addEventListener('click', submitRecipeHandler)
  document.querySelector('#addIngredientBtn').addEventListener('click', addRemoveIngredientHandler)
  