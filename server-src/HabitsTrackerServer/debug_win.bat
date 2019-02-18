:: Build the latest api project
dotnet build

:: Run the api application in a separated command prompt
start cmd /k dotnet run

:: Little pause in order for the server to properly boot up
timeout 5

:: start chrome instance on the habits url
start chrome "http://localhost:5000/api/habits"