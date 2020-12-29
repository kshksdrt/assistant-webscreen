# Assistant Webscreen

A plugin for Tasker and autotools, to build composable UI to launch apps, shortcuts and tasker tasks. Works completely offline, except for the web search feature.

## Setup Instructions

1. Copy the production build("dist" folder contents) to your "Internal Memory/Tasker/Web Screens/Assistant/dist/" folder.
2. Import the tasker project(project.xml) into tasker.
3. Run "Assistant Webscreen" task. This should open your assistant. Enjoy!

## Your data

All your configuration data is stored as user-config.json in the assistant folder. This file holds the entire state of your assistant.

## To build for production

1. Enable purging in tailwind.config.js.
2. Build css.
3. Enable production in store.

## Screenshots

![preview](https://user-images.githubusercontent.com/34638773/103294376-0cc3bd80-49f2-11eb-9bae-81a9f22d4d68.jpg)
