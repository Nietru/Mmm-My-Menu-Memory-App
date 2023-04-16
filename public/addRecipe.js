const addIngredientHandler = async () => {
    const ingredient = document.querySelector('#ingredient').value.trim();
    const ingredientList = document.querySelector('.ingredientList')
    

   if (ingredient){
   
    const li = document.createElement('li');
    li.textContent = ingredient
   ingredientList.appendChild(li)
   document.querySelector('#ingredient').value = '';
   } 
   
}


document.querySelector('#addIngredientBtn').addEventListener('click', addIngredientHandler)