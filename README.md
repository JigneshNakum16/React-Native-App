# React Native Apps Monorepo

This repository contains multiple React Native projects managed in a single repository.

## Project Structure

```
androidApp/
├── demo/                   - React Native demo app with UI components
├── PasswordGenerator/      - React Native password generator app
└── [future projects]/      - Add new React Native projects here
```

## Current Projects

### 1. demo
A React Native application demonstrating various UI components including:
- ActionCard
- ContactList
- ElevatedCards
- FancyCard
- FlatCards

### 2. PasswordGenerator
A React Native password generator application.

## Running Projects

Each project is independent and can be run separately.

### For demo:
```bash
cd demo
npm install
npm start
# For Android
npm run android
# For iOS
npm run ios
```

### For PasswordGenerator:
```bash
cd PasswordGenerator
npm install
npm start
# For Android
npm run android
# For iOS
npm run ios
```

## Adding a New React Native Project

To add a new React Native project to this repository:

1. Navigate to the root directory:
   ```bash
   cd /home/jigneshn/code/androidApp
   ```

2. Create a new React Native project:
   ```bash
   npx react-native@latest init YourProjectName
   ```

3. The new project will be created as a subdirectory

4. Commit and push:
   ```bash
   git add YourProjectName/
   git commit -m "Add YourProjectName React Native project"
   git push origin main
   ```

## Git Management

- The parent `.gitignore` handles common React Native ignores for all projects
- Each project maintains its own dependencies (`node_modules`, `package.json`)
- All projects share the same git repository
- No nested git repositories - all projects are tracked by the parent repo

## Development Notes

- Node modules are ignored globally via the parent `.gitignore`
- Build artifacts (Android/iOS builds) are excluded from version control
- Each project can have different dependencies and configurations
