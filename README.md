# A simple todo list written in vanilla JavaScript

Start the server by running `npm start`.
The following are the supported JSON web service methods



### POST /entries
Creates a new entry

- `@param {String} message`: The message of the entry to create
- **`@returns {Object}`**: The entry that was created



### PUT /entries
Updates the message of an existing entry

- `@param {String} id`: The ID of the entry to update
- `@param {String} message`: The new message
- `@param {Boolean} [silent]`: If true, the lastModified property of the entry will not be updated
- **`@returns {Object}`**: The entry that was updated 



### DELETE /entries
Deletes an existing entry

- `@param {String} id`: The ID of the entry to delete
- **`@returns {Object}`**: The entry that was deleted 
   

   
### GET /entries
Gets an array of existing entries

- `@param {String} [sort]`: **asc** or **desc** If passed, sorts the results by their lastModified property either in ascending or descending order as specified
- `@param {String} [contains]`: If passed, only the entries with messages containing the provided text will be returned.
- **`@returns {Object[]}`**: An array of existing entries



### GET /entries
Get an array of existing entries

- `@param {String} id`: The ID of the entry to return 
- **`@returns {Object}`**: The entry that was matched the provided ID