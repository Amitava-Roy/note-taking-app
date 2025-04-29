# Note Taking App

## Live Demo

Check out the live app here: [Live URL](https://note-taking-app-brown.vercel.app/)

## Setup & Run

1. Clone the repository:

```bash
git clone <[https://github.com/Amitava-Roy/note-taking-app.git](https://github.com/Amitava-Roy/note-taking-app.git)>
cd note-taking-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Why?

- **Storage Strategy**
  - Uses local storage for persistence so notes remain after browser refresh without backend setup.
- **Component Design**
  - Components are modular and reusable, making the codebase easier to maintain and extend.
- **State Management**
  - Utilizes React's built-in state (useState/useContext) for simplicity and performance in a small app.
- **Styling**
  - CSS Modules or styled-components are used for scoped, maintainable styles and to avoid global conflicts.
- **Navigation**
  - React Router (or similar) enables smooth navigation between views (e.g., note list and editor) without full page reloads.
