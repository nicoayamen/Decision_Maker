// document.addEventListener('DOMContentLoaded', (event) => {
//   let dragged;

//   document.querySelectorAll('.decItem').forEach(item => {
//     item.addEventListener('dragstart', function(event) {
//       dragged = this; // store a ref. on the dragged elem
//       event.dataTransfer.setData('text', this.dataset.option); // optional
//     });
//   });

//   document.getElementById('decList').addEventListener('dragover', function(event) {
//     event.preventDefault(); // Prevent default to allow drop
//   });

//   document.getElementById('decList').addEventListener('drop', function(event) {
//     event.preventDefault(); // prevent navigation
//     if (event.target.className === "decItem" && dragged !== event.target) {
//       let targetPosition = findPosition(event.target);
//       let draggedPosition = findPosition(dragged);
//       if (targetPosition < draggedPosition) {
//         event.target.parentNode.insertBefore(dragged, event.target);
//       } else {
//         event.target.parentNode.insertBefore(dragged, event.target.nextSibling);
//       }
//     }
//   });

//   function findPosition(node) {
//     let i = 0;
//     while (node.previousSibling) {
//       node = node.previousSibling;
//       if (node.nodeType === 1) { ++i; }
//     }
//     return i;
//   }
// });
