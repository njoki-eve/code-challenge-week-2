
const addButton = document.getElementById("add-button");
const itemInput = document.getElementById("item-input");
const shoppingList = document.getElementById("shopping-list");
const clearButton = document.getElementById("clear-button"); // "Clear List" button

// Function to load the list from localStorage
function loadList() {
  const storedList = JSON.parse(localStorage.getItem("shoppingList"));
  if (storedList) {
    storedList.forEach(item => {
      createListItem(item.text, item.purchased);
    });
  }
}

// Function to save the list to localStorage
function saveList() {
  const listItems = [];
  const listElements = shoppingList.querySelectorAll("li");

  listElements.forEach(item => {
    listItems.push({
      text: item.textContent.trim(),
      purchased: item.classList.contains("purchased")
    });
  });

  // Save the list to localStorage
  localStorage.setItem("shoppingList", JSON.stringify(listItems));
}

// Function to create a new list item
function createListItem(itemText, isPurchased = false) {
  const li = document.createElement("li");

  // Add "purchased" class if item is marked as purchased
  if (isPurchased) {
    li.classList.add("purchased");
  }

  li.textContent = itemText;

  // Create a "Mark Purchased" button
  const markPurchasedButton = document.createElement("button");
  markPurchasedButton.textContent = "Mark Purchased";

  // Event listener for "Mark Purchased" button
  markPurchasedButton.addEventListener("click", () => {
    li.classList.toggle("purchased");
    saveList(); // Save the updated list to localStorage after marking purchased
  });

  // Add the button to the list item
  li.appendChild(markPurchasedButton);

  // Add event listener for editing an item (double-click to edit)
  li.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.value = li.textContent.replace("Mark Purchased", "").trim(); // Remove button text when editing

    // Replace the list item text with the input field
    li.textContent = "";
    li.appendChild(input);

    // Focus on the input field
    input.focus();

    // Save the edit when Enter is pressed or input loses focus
    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });

    function saveEdit() {
      li.textContent = input.value.trim() || li.textContent; // Use new value or keep old
      li.appendChild(markPurchasedButton); // Re-append the button after editing
      saveList(); // Save the updated list after editing
    }
  });

  // Append the new list item to the shopping list
  shoppingList.appendChild(li);
}

// Add event listener to the "Add" button
addButton.addEventListener("click", () => {
  const itemText = itemInput.value.trim();

  // Validate: Ensure the input is not empty
  if (itemText === "") {
    alert("Please enter an item!");
    return;
  }

  // Create and append the new list item
  createListItem(itemText);

  // Clear the input field
  itemInput.value = "";

  // Save the updated list to localStorage
  saveList();
});

// Add event listener to the "Clear List" button
clearButton.addEventListener("click", () => {
  // Clear the shopping list in the DOM
  shoppingList.innerHTML = "";
  
  // Clear the list from localStorage
  localStorage.removeItem("shoppingList");
});
  
// Load the shopping list from localStorage when the page loads
loadList();