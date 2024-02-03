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

