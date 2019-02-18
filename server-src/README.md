# Habits Tracker Backend

This is a simple dotnet core API application which provides simple CRUDs operations.
Double click on debug_win.bat inside the solution folder to start the server on windows machines.

## CRUD operations
URL can vary whether you run the API app with visual studio or using the command line (or the .bat file).

**GET**:
- URL/api/habits        (returns all habits)
- URL/api/habits/{id}   (returns the specified habit)

**POST**:
- URL/api/habits        (creates a new habit (specified in the body) and returns it)

**PUT**:
- URL/api/habits/{id}   (updates the specified habit (values passed in the body) and returns nothing)

**DELETE**:
- URL/api/habits/{id}   (delete the specified habit and returns nothing)

 ## NOTES
 Ids are created and handled by the backend.