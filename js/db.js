// offline data
db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple DB support
    console.log("Persistence failed");
  } else if (err.code === "failed-precondition") {
    // lack of browser support
    console.log("Persistence is not available");
  }
});

// realtime listener
db.collection("recipes").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    switch (change.type) {
      case "added":
        renderRecipe(change.doc.data(), change.doc.id);
        break;
      case "removed":
        removeRecipe(change.doc.id);
        break;
      default:
        break;
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((error) => console.log(error));

  form.title.value = "";
  form.ingredients.value = "";
});

// Delete recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
