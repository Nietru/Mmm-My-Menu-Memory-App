const deleteRecipeHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/recipe/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete recipe");
    }
  }
};

const editRecipeHandler = (event) => {
  console.log("edit recipe clicked");
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    document.location.replace(`/editrecipe/${id}`);
  }
};

document
  .querySelector("#delete")
  .addEventListener("click", deleteRecipeHandler);
document.querySelector("#edit").addEventListener("click", editRecipeHandler);
