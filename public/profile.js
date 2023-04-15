const deleteRecipeHandler = async (event) =>{
    
if (event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipe/${id}`,{
        method:'DELETE'
    });

    if(response.ok){
        document.location.replace('/profile')
    } else {
        alert('Failed to delete recipe')
    }
}


}

document.querySelector('#delete').addEventListener('click',deleteRecipeHandler)


const editRecipeHandler = async (event) =>{

}