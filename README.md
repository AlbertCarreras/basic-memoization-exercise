## USING MEMOIZATION WITH REACT

## Demo video
No demo

## Technologies

### Front-end
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Notes on front-end: 

Code organization
- All the code is inside App.js.

App design
- Get API key to be able to fetch from YouTube.
- This app is an exercise to use memoize-one. This technique is detailed in the [React documentation](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) and the memoize-one documentation is [here](https://github.com/alexreardon/memoize-one). By memoizing, we prevent from running the function that builds the video lists over an over every time there is a re-render (which happens every time the state changes due to input fields being controlled).
By console.logging inside the render() method and the memoize function, we can follow when both are happening and see that the memoize function only calls the function within if the arguments passed are different from the previous one.
- Other notes: we are binding functions inside the constructor. create-react-app integrates "public class fields syntax" which makes unnecessary binding with new function syntax.
- Other notes: we are using try/catch with async/await syntax for networking (fetching from the API).


#### Set up
1. Clone repo.
1. Install dependencies `npm install`.
1. Start your server `npm start`.

#### Test
No tests

### Back-end 
No backend