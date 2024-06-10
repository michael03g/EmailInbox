# Simple Google Drive || GitHub Activity Generator

## Description (MileStone 1: Simple Google Drive)
Milestone1: Build a simple email inbox application
- User should be able to login / logout.
  Email should end with "@hometask.com" for validation checking
- User should be able to see the list of emails in the inbox and click one of them to see the content in HTML format
- User should be able to send a new email (@hometask.com) with validation checking
  Title and Description (HTML content)
- User should be able to mark the emails READ or UNREAD and move to / recover from trash bin
- User should be able to search through email based on user's name, title or content.
- User should be able to reply to the emails
  The emails within the same thread should be grouped and displayed as one in the list
- User should be able to filter out by READ or UNREAD status

## Description (MileStone 2: GitHub activity generator)
Milestone2: Additionally, user should be able to generate GitHub activity project and download as a *.zip file.
Parameters:
 - Activity Period: Start Date, End Date
 - Maximum commits per day:
 - Frequency: How much percentage of the activity period is used
   For example, 100% -> there's git commit history for all the days during the period.
   60% -> there's git commit history about 60% of the days in the period
Notes: Validation is required

# Challenges
- Handle reply, delete/recover, read/unread.
- Support uploading subfiles and directories for folder upload.
- View a nested structure for folder on the frontend.
- Support compressing and downloading directory on the backend using JSZip.
- Implement auto-expiration on the recycle bin by creating a cron job on the backend.

## Environment
- Windows 11
- Node v18.19.0
- Npm 10.2.3

## Tech stacks
- Vite + React + Typescript
- Express
- Postgres

## Steps to run program
1. Install node modules
   ```shell
   npm install
   ```

2. Run project
   ```shell
   npm run dev
   ```
This will host the project on http://localhost:3000.