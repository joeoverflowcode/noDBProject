This is my first full project attempt with JavaScript, Vite+React and Express. 

The project attempts to implement the principals of 'CRUD' create, read, update and delete in the fashion of a simple 'Todo' list. The static website is functional, on render, users are able to add items to the to do list, edit and delete them. The edit feature sends the todo-list item back to the original entry field in order to edit the content then click 'edit' again in order to submit the updated data.


On homepage render, the elements of the app are held within a container centering it on the viewable area. In order the elements are a Header, a form with submit button, unordered list with 2 corresponding buttons, one to edit and the other to delete. The input field takes in data from the user to add to the list. When a new line is created in the list, it renders with an edit and delete button. 

'Delete' removes the entire row and contents from the list. 'Edit' takes the text contents of the row back to the form row where the user can edit the contents. The 'Submit' button during 'Edit-mode' changes to edit so it is understood that the same element is being edited versus being newly created. Clicking 'Edit' pushes the data back to the list to view content. 

As of 9/4/2023 3pm CST, Express backend has not been successfully connected. A server app.js and routes have been established but the reconfiguring of the functions in TodoList.jsx has not been completed in order to take in and store data on Express.

