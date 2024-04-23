@echo off
REM Run Node.js script
node src\main_json.js

REM Save git diff to a log file
git diff > log_data\diff.log

REM Stage all changes
git add .

REM Commit changes with a message
git commit -m "Update JSON data from Excel file"

REM Push changes to the remote repository
git push -u origin main

REM Save git log to a log file
git log > log_data\log.log