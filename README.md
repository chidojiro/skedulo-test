# Author Notes

To configure schedules and working time, please visit `src/packages/calendar/mockSchedules.json` and `src/packages/calendar/mockWorkingTime.json`

Drag and drop feature can be done with `react-dnd` but it would cost a lot of time so I don't implement it now.

Some limitations of the calendar at current state:

- It is using json for schedules/working time (can not be updated via the app) and localStorage for extra available time.
- Performance is not ideal, but it can be resolved with `react-window` and/or `react-virtualized`.
- Calendar can support only 2 overlapping time range which are default available range and extra available range.
- There is no feature to edit data once it is created.

# Getting Started with Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the dependencies for the app

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
