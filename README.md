# Tracker

## Elevator pitch

Have you ever wanted to gain muscle or lose fat? The best way to do this is to track what food you eat. With the Tracker application, you will be able to enter in the calories, carbs, fat and protein you consume with each meal. You can also save pre-constructed meals, set goals for yourself, and even compete with friends! Start your fitness journey today with Tracker.

## Key features

- Secure login over HTTPS
- Ability to add new foods (calories, macros)
- Ability to save those foods as meals for easier tracking
- Ability to set goals
- Ability to add friends
- See how your friends are doing throughout the day with the leaderboard
- Get a notification when a friend adds a meal or hits a new goal
- Comment on friends goals / meals when you get a notification
- Persistent storage daily calories and weight so user can go back and look

## Design

![image](https://github.com/krewdreele/startup/assets/97317394/ee11bd46-104e-4dc8-8d66-43e606e3ac59)

## Technologies

I am going to use the required technologies in the following ways.

- HTML: Uses correct HTML structure for application. Three HTML pages. One for login, one for the main page, goals, leaderboard and log, and one for the meals page (similar structured pages will have the same HTML). Hyperlinks to choice artifacts.
- CSS: Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- JavaScript : Provides login, adding meals, adding food, adding friends, adding goals, adding comments, displays other friends' meals and their comments, and backend endpoint calls. Also checks whether user has hit their goals.
- Service: Backend service with endpoints for:
- login
- retrieving leaderboard
- retrieving meals
- retrieving goals
- retrieving log
- submitting meals
- submitting log
- submitting goals
- DB/Login: Store users, meals, goals, and log in database. Register and login users. Credentials securely stored in database. Can't do or see anything unless authenticated.
- WebSocket: As each user adds food or hits a goal, a notification is broadcast to all other friends. Notifications can also happen if a friend comments on your post.
- React: Application ported to use the React web framework.

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

- HTML pages - Eight html pages (probably will condense in the future) to represent login,
  home, adding food, profile, friends, goals, food log, and meals.
- Links - Login page links to home page. Home page links to all other pages besides friends. Profile page links to friends. All pages link back to all others.
- Text - Calorie count, meals and macros represented with text
- Images - Just have a profile image for now, will probably add more images to meals page and login.
- DB/Login - Input box and submit button for login. I want to store meal information, goals and a daily log info in the DB. These all have separate html pages.
- WebSocket - The notifications give the user updates on what their friends are eating and allows for comments / replies.
- Third party - If there is a way to use a third party service to look up foods and add them automatically that would be cool to implement.

## CSS Deliverable

Styled the website into its final appearance using CSS and Bootstrap.

- Header footer and main content sections
- Navigation buttons styled with bootstrap
- Added modals to a lot of buttons to have pop-ups look good
- Responsive to different window sizes
- Added a calendar to easily keep track of personal log
- Third party service will call openfoodfacts.org to get nutrition information about different food
- Application elements have good contrast and whitespace
- Consistent font used throughout the whole website
- Images will be uploaded by the user but there are a few example images throughout the website

## JavaScript Deliverable

Added the basic functionality to the website using javascript.

- Create account with password verification
- Login with username and password
- Feed will contain websocket posts from other user's (friends)
- Add food to your daily calorie / macro counter by clicking the plus sign and searching through your meals
- Update main goal and daily goals
- Add a meal for breakfast, lunch or dinner
- Third party service will provide info automatically for different foods
- Calendar is now automated and set to this year (2024)
- Still need to have the log pull up the actual goals achieved (will implement with database)
- Profile can now add posts
- Still need to figure out how to add pictures (to meals or posts)
- Profile still needs a few things (edit, light/dark mode, add a friend)
- Need to figure out how to navigate to other user's profiles (fill out new html doc for user?)

## Services Deliverable

Created a backend service using express and node.js. Called backend and third party services in front end.
(You can login with -u 'admin' -p 'h' if you don't want to create a profile)

Third party service:

- Edamam api calls to get food information (when adding a meal on the "meals" page)

Endpoints:

- create account (post/user)
- login (post/auth)
- get user (get/user)

- create meal & update meal (post/meal?user='username')
- get all meals (get/meals?user='username')
- get meal info (get/meal?user='username'&meal='meal name')

- save main or daily goal (post/goal?user='username'&type='goal type')
- get main or daily goal info (get/goal?user='username'&type='goal type')

- get totals for a specific day(get/totals?user='username'&date='1/2/2024')
- update daily totals (put/totals?user='username')

- create a post (post/post?user='username')
- get all posts (get/posts?user='username')
- get profile info (get/profile?user='username')
- update profile (put/profile?user='username')
