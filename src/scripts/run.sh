#!/bin/bash

# Run Node.js script to process JSON
node src/main_json.js

# Save git diff to a log file
git diff > log_data/diff.log

# Stage all changes
git add .

# Commit changes with a message
git commit -m "Update JSON data from Excel file"

# Push changes to the remote repository
git push -u origin main

# Save git log to a log file
git log > log_data/log.log