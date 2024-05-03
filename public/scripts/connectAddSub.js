// $(document).ready(function() {
//   var pollId = getPollId();
//   $('#pollId').val(pollId);

//   $('#submissionForm').submit(function(event) {
//     event.preventDefault();
//     var formData = $(this).serialize();

//     $.ajax({
//       type: 'POST',
//       url: '/vote/' + pollId,
//       data: formData,
//       success: function(response) {
//         console.log(response);
//         alert('Submission successful');
//       },
//       error: function(xhr, status, error) {
//         console.error(xhr.responseText);
//         alert('Error submitting form');
//       }
//     });
//   });
// });

// function getPollId() {
//   // Make an AJAX request to fetch the poll_id from the server
//   return $.ajax({
//     type: 'POST',
//     url: '/vote/poll_id', // Replace this with the actual endpoint to fetch the poll_id
//     async: false, // Ensure synchronous request to get the poll_id before continuing
//     success: function(response) {
//       // Assuming the response contains the poll_id
//       return response.poll_id;
//     },
//     error: function(xhr, status, error) {
//       console.error(xhr.responseText);
//       // Handle error case appropriately
//     }
//   });
// }

