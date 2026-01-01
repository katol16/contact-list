# TODO

Please do not fork the repo, clone it and put it in your own github / save it locally.

Definition of done:

1. Fetch contacts using `apiData` function. Contacts are paginated (10 items in batch).
2. "Load more" button is positioned at the bottom of the list. It fetches next batch and appends it to the existing list.
3. Loading state is handled, display some kind of spinner / loader.
4. Error state is handled. It allows to refetch failed batch.
5. Each contact information card is selectable.
6. Selected contacts have outline around them.
7. Selected card can be deselected.
8. Selected contacts are displayed at the top of the list.
9. List performance is optimized when selecting/deselecting/scrolling cards.

Doing this task in typescript is preferred. However, if you do not feel comfortable with typescript, please change file extension to js.

We appreciate code that is written manually, so avoid including extra dependencies unless they are essential.
Design choices are yours, but please stick to provided layout pattern. Please have UX in mind when making decisions.

![layout.png](layout.png)

Optional: Add functional / unit tests with testing library of your choice.

Good luck and do not hesitate to ask in case of any questions!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


---

# Technical Notes for Recruiters

This implementation was prepared by Karol Vogelgezang as part of a recruitment task.

# Contact List App

This project is a **Contact List application** built in **React + TypeScript**, implementing the requirements of a recruitment task. It demonstrates fetching paginated contact data, selecting/deselecting contacts, handling loading and error states, and basic performance optimizations.

---

## Features

- **Fetch contacts:** Contacts are fetched from the provided `apiData` function, 10 items per batch. The "Load more" button fetches the next batch and appends it to the list.
- **Loading & Error States:** A spinner is displayed while loading. Errors show a message, and the "Load more" button changes to "Try Again" to allow retry.
- **Selectable contacts:** Each contact card is clickable. Selected cards are highlighted, can be deselected, and always appear at the top of the list.
- **Performance Optimizations:** `PersonInfo` cards are wrapped in `React.memo` to avoid unnecessary re-renders when toggling selection.
- **User Experience:** "Load more" button is at the bottom, disabled during loading to prevent multiple fetches, and the layout separates selected and unselected contacts.

---

## Architecture & Decisions

- **Custom hooks:**
    - `useContacts` – manages fetching, loading, error states, and pagination.
    - `useSelectableList` – manages selected/unselected contacts and toggle logic.
- **Component structure:**
    - `App.tsx` – main container with lists, spinner, error display, and load button.
    - `ContactList.tsx` – renders a list of `PersonInfo` components.
    - `PersonInfo.tsx` – individual contact card with selection handling.
- **Memoization:** `PersonInfo` uses `React.memo` to optimize rendering.
- **Testing:** Covers fetching, loading, error handling, button behavior, and selection functionality. `data-testid` attributes were added for reliable testing.

---

## Code Quality & Linting

This project uses **ESLint** and **Prettier** for code quality and formatting.
- ESLint configuration is customized for **React + TypeScript**.
- All linting errors are displayed in the editor (e.g., VSCode) in real-time.
- Prettier ensures consistent code formatting across the project.
- No unnecessary dependencies were added; all rules are essential for maintaining code quality.

## Note

React 18 Strict Mode is enabled during development, which causes the useEffect that calls `fetchContacts` function to run twice on initial render. This does **not** affect production behavior.