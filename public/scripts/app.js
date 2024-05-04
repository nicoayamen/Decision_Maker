// Client facing scripts here

// Define the drag function
const todoList = document.getElementById("decList");
let draggingElement;

todoList.addEventListener("dragstart", handleDragStart);
todoList.addEventListener("dragover", handleDragOver);
todoList.addEventListener("dragenter", handleDragEnter);
todoList.addEventListener("dragleave", handleDragLeave);
todoList.addEventListener("drop", handleDrop);

function handleDragStart(event) {
  draggingElement = event.target;
  event.dataTransfer.setData("text/plain", ""); // necessary for Firefox
  event.target.classList.add("dragging");
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  event.target.classList.add("dragover");
}

function handleDragLeave(event) {
  event.target.classList.remove("dragover");
}
let bordaCount = {};

function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove("dragover");
  const dropTarget = event.target.closest(".decItem");

  if (dropTarget) {
    const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(
      dropTarget
    );
    const draggingIndex = Array.from(
      draggingElement.parentNode.children
    ).indexOf(draggingElement);
    const inputs = Array.from(todoList.querySelectorAll("input[type='text']"));

    // Update the rankings based on the drop position
    inputs.forEach((input, index) => {
      if (index === dropIndex) {
        const itemName = draggingElement.querySelector("input").value;
        bordaCount[itemName] = bordaCount[itemName] || 0;
        bordaCount[itemName] += inputs.length - index - 1;
      } else if (index < draggingIndex && index >= dropIndex) {
        const itemName = inputs[index + 1].value;
        bordaCount[itemName] = bordaCount[itemName] || 0;
        bordaCount[itemName]++;
      } else if (index > draggingIndex && index <= dropIndex) {
        const itemName = inputs[index - 1].value;
        bordaCount[itemName] = bordaCount[itemName] || 0;
        bordaCount[itemName]--;
      }
    });

    // Log the updated Borda count
    console.log("Updated Borda count:", bordaCount);
  }
  draggingElement.classList.remove("dragging");
}
// function handleDrop(event) {
//   event.preventDefault();
//   event.target.classList.remove("dragover");
//   const dropTarget = event.target.closest(".decItem");
//   if (dropTarget) {
//     const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(
//       dropTarget
//     );
//     const draggingIndex = Array.from(
//       draggingElement.parentNode.children
//     ).indexOf(draggingElement);
//     const inputs = Array.from(todoList.querySelectorAll("input[type='text']"));

//     inputs.forEach((input, index) => {
//       if (index === dropIndex) {
//         input.value = draggingElement.querySelector("input").value;
//       } else if (index > dropIndex && index <= draggingIndex) {
//         input.value = inputs[index - 1].value;
//       } else if (index < dropIndex && index >= draggingIndex) {
//         input.value = inputs[index + 1].value;
//       }
//     });

//     // Logging the updated values of rank_1, rank_2, etc.
//     console.log(
//       "Updated rank_1:",
//       inputs.find((input) => input.name === "rank_1").value
//     );
//     console.log(
//       "Updated rank_2:",
//       inputs.find((input) => input.name === "rank_2").value
//     );
//     console.log(
//       "Updated rank_3:",
//       inputs.find((input) => input.name === "rank_3").value
//     );
//     console.log(
//       "Updated rank_4:",
//       inputs.find((input) => input.name === "rank_4").value
//     );
//   }
//   draggingElement.classList.remove("dragging");
// }
