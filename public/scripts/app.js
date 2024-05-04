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

function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove("dragover");
  const dropTarget = event.target.closest(".decItem");
  if (dropTarget) {
    const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(
      dropTarget
    );
    const draggingIndex = Array.from(draggingElement.parentNode.children).indexOf(
      draggingElement
    );
    if (dropIndex > draggingIndex) {
      dropTarget.parentNode.insertBefore(draggingElement, dropTarget.nextSibling);
    } else {
      dropTarget.parentNode.insertBefore(draggingElement, dropTarget);
    }
  }
  draggingElement.classList.remove("dragging");
}