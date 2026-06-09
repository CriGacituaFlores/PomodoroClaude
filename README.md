# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# PomodoroClaude


🤖 Prompt for Claude Code:
```
Build a simple but cute Pomodoro timer app.

*Stack (already set up):*
React + TypeScript
Vite
Tailwind CSS (v4, already configured)

Do NOT install any additional packages. Use only what's already there.

*Features:*

1. A main timer display showing MM:SS, large and centered.

2. Three modes, switchable via buttons at the top:
Focus (default: 25 min)
Short Break (default: 5 min)
Long Break (default: 15 min)
   The active mode should be visually highlighted.

3. Timer controls below the display: Start / Pause / Reset buttons.

4. A settings panel (visible below the timer, not in a modal) where the user
   can customize the duration in minutes for each of the three modes using
   number inputs. Changes should update the timer immediately when a mode is
   selected. Use controlled inputs.

5. A "Today's sessions" list at the bottom that logs every completed focus
   session with:
A unique id (use crypto.randomUUID())
The mode name
The duration in minutes
   
Each list item must be rendered with a key prop using the id.

6. When the timer reaches 0:00, log the completed session to the list and
   stop the timer (do not auto-start the next mode).

*Code structure requirements:*

Split into at least 5 components so props are passed parent → child:
App (holds state)
TimerDisplay (receives minutes and seconds as props)
SessionList (receives the sessions array as props)
ModeSelector 
SettingsPanel

Use useState for: current mode, time remaining in seconds, isRunning flag, the durations object, and the sessions array.

Use useEffect for the countdown. Use setInterval inside useEffect and return a cleanup function that clears the interval. Include the correct dependency array.

Use TypeScript properly: define types/interfaces for Mode, Session, and component props. No `any`.

*Styling (keep it cute, not overloaded):*

Soft pastel background (something like a warm cream or soft peach tone).
Rounded corners everywhere (rounded-2xl or rounded-3xl).
One accent color used consistently for the active mode and primary button
  (a warm yellow like #f6c90f works great).
Generous padding and whitespace. The whole app should feel breathable.
Centered layout, max width around 400-500px, vertically centered on the page.
Large friendly timer font (use font-mono or tabular-nums so digits don't jump).
Subtle hover states on buttons. No shadows heavier than shadow-md.
Add one small cute touch: a tomato emoji 🍅 in the header next to the app name "Pomodoro".

Keep the code clean and readable — this will be used to teach React
fundamentals, so prefer clarity over cleverness.
```