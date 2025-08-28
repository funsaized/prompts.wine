# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `yarn install` - Install dependencies
- `yarn build` - Build all packages (excluding next-app and storybook-app)
- `yarn typecheck` - Run TypeScript type checking across all packages
- `yarn lint` - Run ESLint across all packages
- `yarn lint:fix` - Fix ESLint issues

### Application Development

- `yarn web` - Start Next.js development server
- `yarn ios` - Run iOS app (requires local IP for web server: `yarn web -H $(yarn get-local-ip-mac | head -n 1)`)
- `yarn android` - Run Android app
- `yarn native` - Start Expo development server

### Testing and Quality

- `yarn check:type` - Type check with output to /tmp
- `yarn check:type:watch` - Watch mode for type checking
- `yarn check-circular-deps` - Check for circular dependencies

### Supabase Database

- `yarn supa start` - Start local Supabase with Docker
- `yarn supa stop` - Stop local Supabase
- `yarn supa g` - Generate TypeScript types from local DB
- `yarn supa generate:remote` - Generate types from remote Supabase

### Storybook

- `yarn storybook:web` - Start web Storybook
- `yarn storybook:ios` - Start iOS Storybook
- `yarn storybook:android` - Start Android Storybook

### Code Generation

- `yarn gen component` - Generate new component
- `yarn gen screen` - Generate new screen
- `yarn gen router` - Generate new tRPC router

## Project Architecture

### Monorepo Structure

This is a Yarn workspace monorepo with the following structure:

- **`apps/`** - Application entry points
  - `expo/` - React Native app using Expo Router
  - `next/` - Next.js web application
  - `storybook/` - Web Storybook
  - `storybook-rn/` - React Native Storybook

- **`packages/`** - Shared packages
  - `app/` - Main application logic and features
  - `ui/` - Tamagui-based UI components
  - `api/` - tRPC API definitions
  - `eslint-config-custom/` - ESLint configuration
  - `fonts-and-icons/` - Font and icon utilities

- **`supabase/`** - Database migrations, types, and utilities

### Key Technologies

- **Tamagui** - Universal UI system (React Native + Web)
- **Expo Router** - File-based routing for React Native
- **Next.js** - React framework for web
- **tRPC** - Type-safe API layer
- **Supabase** - Database, auth, and storage backend
- **Turbo** - Build system and task runner

### Application Entry Points

- **Expo**: `apps/expo/app/(tabs)/index.tsx`
- **Next.js**: `apps/next/pages/` (using Pages Router)

### Feature Organization

Features are organized in `packages/app/features/` with each feature containing:

- `screen.tsx` - Main screen component
- `layout.web.tsx` - Web-specific layout (if needed)
- `components/` - Feature-specific components

### Cross-Platform Development

- Use `solito` for navigation between React Native and web
- Platform-specific files use `.native.tsx` and `.web.tsx` extensions
- Shared components in `packages/ui/`
- Platform-specific providers in `packages/app/provider/`

### Authentication Flow

- Supabase Auth with email/password and OAuth (Google, Apple)
- Web: Protected routes via `middleware.ts`
- Native: Auth provider redirects in `apps/expo/app/provider/auth/AuthProvider.native.ts`
- Local email confirmation via Inbucket at `http://localhost:54324`

### Database Development

- Local development with Docker Supabase
- Generate migrations with `yarn supa migration:diff <NAME>`
- Types auto-generated from schema
- Migrations in `supabase/migrations/`

### Environment Setup

- Single `.env` file in root for all apps
- Apps use `with-env` script to load environment
- Copy `.env.example` to `.env` to start

## Development Notes

### Code Style & Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- Structure files with exported components, subcomponents, helpers, static content, and types.
- Favor named exports for components and functions.
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`).

### TypeScript and Zod Usage

- Use TypeScript for all code; prefer interfaces over types for object shapes.
- Utilize Zod for schema validation and type inference.
- Avoid enums; use literal types or maps instead.
- Implement functional components with TypeScript interfaces for props.

### Syntax and Formatting

- Use the `function` keyword for pure functions.
- Write declarative JSX with clear and readable structure.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.

### UI and Styling

- Use Tamagui for cross-platform UI components and styling.
- Implement responsive design with a mobile-first approach.
- Ensure styling consistency between web and native applications.
- Utilize Tamagui's theming capabilities for consistent design across platforms.

### State Management and Data Fetching

- Use Zustand for state management.
- Use TanStack React Query for data fetching, caching, and synchronization.
- Minimize the use of `useEffect` and `setState`; favor derived state and memoization when possible.

### Internationalization

- Use i18next and react-i18next for web applications.
- Use expo-localization for React Native apps.
- Ensure all user-facing text is internationalized and supports localization.

### Error Handling and Validation

- Prioritize error handling and edge cases.
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deep nesting.
- Utilize guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Use custom error types or factories for consistent error handling.

### Performance Optimization

- Optimize for both web and mobile performance.
- Use dynamic imports for code splitting in Next.js.
- Implement lazy loading for non-critical components.
- Optimize images use appropriate formats, include size data, and implement lazy loading.

### Monorepo Management

- Follow best practices using Turbo for monorepo setups.
- Ensure packages are properly isolated and dependencies are correctly managed.
- Use shared configurations and scripts where appropriate.
- Utilize the workspace structure as defined in the root `package.json`.

### Backend and Database

- Use Supabase for backend services, including authentication and database interactions.
- Follow Supabase guidelines for security and performance.
- Use Zod schemas to validate data exchanged with the backend.

### Cross-Platform Development

- Use Solito for navigation in both web and mobile applications.
- Implement platform-specific code when necessary, using `.native.tsx` files for React Native-specific components.
- Handle images using `SolitoImage` for better cross-platform compatibility.

### Stripe Integration and Subscription Model

- Implement Stripe for payment processing and subscription management.
- Use Stripe's Customer Portal for subscription management.
- Implement webhook handlers for Stripe events (e.g., subscription created, updated, or cancelled).
- Ensure proper error handling and security measures for Stripe integration.
- Sync subscription status with user data in Supabase.

### Testing and Quality Assurance

- Write unit and integration tests for critical components.
- Use testing libraries compatible with React and React Native.
- Ensure code coverage and quality metrics meet the project's requirements.

### Project Structure and Environment

- Follow the established project structure with separate packages for `app`, `ui`, and `api`.
- Use the `apps` directory for Next.js and Expo applications.
- Utilize the `packages` directory for shared code and components.
- Use `dotenv` for environment variable management.
- Follow patterns for environment-specific configurations in `eas.json` and `next.config.js`.
- Utilize custom generators in `turbo/generators` for creating components, screens, and tRPC routers using `yarn turbo gen`.

### Key Conventions

- Use descriptive and meaningful commit messages.
- Ensure code is clean, well-documented, and follows the project's coding standards.
- Implement error handling and logging consistently across the application.

### Follow Official Documentation

- Adhere to the official documentation for each technology used.
- For Next.js, focus on data fetching methods and routing conventions.
- Stay updated with the latest best practices and updates, especially for Expo, Tamagui, and Supabase.

### iOS Development

- Requires Xcode ≥ 16 for Expo SDK 53
- Use Cocoapods 1.14.3 (1.15 has breaking bugs)
- Set `NODE_BINARY` in `apps/expo/ios/.xcode.env` to your node path

### Native vs Web Testing

- For native testing, always run web server first for tRPC requests
- Use local IP for iOS simulator: `yarn web -H $(yarn get-local-ip-mac | head -n 1)`

### Package Management

- Install JS-only deps in `packages/app/`
- Install native deps in `apps/expo/`
- Ensure exact version matching for native deps across packages

### Build Process

- `yarn build` builds all packages except next-app and storybook
- Web production build: `yarn web:prod`
- Native builds via EAS: Scripts in `apps/expo/package.json`

### Deployment

- Web: Deploy `apps/next/` to Vercel
- Native: Use EAS for builds and updates
- Update `owner` and `projectId` in `apps/expo/app.json`
