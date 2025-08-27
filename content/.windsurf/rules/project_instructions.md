You will be given tasks including document generation, architecture and design, and feature development. Use these instructions as a guide to completing your goals.

<developer_profile>
  <expertise>
    <technology>TypeScript</technology>
    <technology>React</technology>
    <technology>Next.js</technology>
    <technology>Expo (React Native)</technology>
    <technology>Tamagui</technology>
    <technology>Supabase</technology>
    <technology>Zod</technology>
    <technology>Turbo (Monorepo Management)</technology>
    <technology>i18next (react-i18next, i18next, expo-localization)</technology>
    <technology>Zustand</technology>
    <technology>TanStack React Query</technology>
    <technology>Solito</technology>
    <technology>Stripe (with subscription model)</technology>
  </expertise>
  
  <tasks>
    <task>Document generation</task>
    <task>Architecture and design</task>
    <task>Feature development</task>
  </tasks>
</developer_profile>

<code_style_and_structure>
  <principles>
    <principle>Write concise, technical TypeScript code with accurate examples</principle>
    <principle>Use functional and declarative programming patterns; avoid classes</principle>
    <principle>Prefer iteration and modularization over code duplication</principle>
    <principle>Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)</principle>
    <principle>Structure files with exported components, subcomponents, helpers, static content, and types</principle>
    <principle>Favor named exports for components and functions</principle>
    <principle>Use lowercase with dashes for directory names (e.g., `components/auth-wizard`)</principle>
  </principles>
</code_style_and_structure>

<typescript_and_zod>
  <rules>
    <rule>Use TypeScript for all code; prefer interfaces over types for object shapes</rule>
    <rule>Utilize Zod for schema validation and type inference</rule>
    <rule>Avoid enums; use literal types or maps instead</rule>
    <rule>Implement functional components with TypeScript interfaces for props</rule>
  </rules>
</typescript_and_zod>

<syntax_and_formatting>
  <rules>
    <rule>Use the `function` keyword for pure functions</rule>
    <rule>Write declarative JSX with clear and readable structure</rule>
    <rule>Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements</rule>
  </rules>
</syntax_and_formatting>

<ui_and_styling>
  <guidelines>
    <guideline>Use Tamagui for cross-platform UI components and styling</guideline>
    <guideline>Implement responsive design with a mobile-first approach</guideline>
    <guideline>Ensure styling consistency between web and native applications</guideline>
    <guideline>Utilize Tamagui's theming capabilities for consistent design across platforms</guideline>
  </guidelines>
</ui_and_styling>

<state_management_and_data_fetching>
  <practices>
    <practice>Use Zustand for state management</practice>
    <practice>Use TanStack React Query for data fetching, caching, and synchronization</practice>
    <practice>Minimize the use of `useEffect` and `setState`; favor derived state and memoization when possible</practice>
  </practices>
</state_management_and_data_fetching>

<internationalization>
  <implementation>
    <web>Use i18next and react-i18next for web applications</web>
    <native>Use expo-localization for React Native apps</native>
    <requirement>Ensure all user-facing text is internationalized and supports localization</requirement>
  </implementation>
</internationalization>

<error_handling_and_validation>
  <best_practices>
    <practice>Prioritize error handling and edge cases</practice>
    <practice>Handle errors and edge cases at the beginning of functions</practice>
    <practice>Use early returns for error conditions to avoid deep nesting</practice>
    <practice>Utilize guard clauses to handle preconditions and invalid states early</practice>
    <practice>Implement proper error logging and user-friendly error messages</practice>
    <practice>Use custom error types or factories for consistent error handling</practice>
  </best_practices>
</error_handling_and_validation>

<performance_optimization>
  <techniques>
    <technique>Optimize for both web and mobile performance</technique>
    <technique>Use dynamic imports for code splitting in Next.js</technique>
    <technique>Implement lazy loading for non-critical components</technique>
    <technique>Optimize images use appropriate formats, include size data, and implement lazy loading</technique>
  </techniques>
</performance_optimization>

<monorepo_management>
  <practices>
    <practice>Follow best practices using Turbo for monorepo setups</practice>
    <practice>Ensure packages are properly isolated and dependencies are correctly managed</practice>
    <practice>Use shared configurations and scripts where appropriate</practice>
    <practice>Utilize the workspace structure as defined in the root `package.json`</practice>
  </practices>
</monorepo_management>

<backend_and_database>
  <guidelines>
    <guideline>Use Supabase for backend services, including authentication and database interactions</guideline>
    <guideline>Follow Supabase guidelines for security and performance</guideline>
    <guideline>Use Zod schemas to validate data exchanged with the backend</guideline>
  </guidelines>
</backend_and_database>

<cross_platform_development>
  <approaches>
    <approach>Use Solito for navigation in both web and mobile applications</approach>
    <approach>Implement platform-specific code when necessary, using `.native.tsx` files for React Native-specific components</approach>
    <approach>Handle images using `SolitoImage` for better cross-platform compatibility</approach>
  </approaches>
</cross_platform_development>

<stripe_integration>
  <implementation_guidelines>
    <guideline>Implement Stripe for payment processing and subscription management</guideline>
    <guideline>Use Stripe's Customer Portal for subscription management</guideline>
    <guideline>Implement webhook handlers for Stripe events (e.g., subscription created, updated, or cancelled)</guideline>
    <guideline>Ensure proper error handling and security measures for Stripe integration</guideline>
    <guideline>Sync subscription status with user data in Supabase</guideline>
  </implementation_guidelines>
</stripe_integration>

<testing_and_quality_assurance>
  <requirements>
    <requirement>Write unit and integration tests for critical components</requirement>
    <requirement>Use testing libraries compatible with React and React Native</requirement>
    <requirement>Ensure code coverage and quality metrics meet the project's requirements</requirement>
  </requirements>
</testing_and_quality_assurance>

<project_structure_and_environment>
  <structure>
    <directory name="apps">Next.js and Expo applications</directory>
    <directory name="packages">Shared code and components</directory>
    <directory name="turbo/generators">Custom generators for creating components, screens, and tRPC routers</directory>
  </structure>
  
  <conventions>
    <convention>Follow the established project structure with separate packages for `app`, `ui`, and `api`</convention>
    <convention>Use `dotenv` for environment variable management</convention>
    <convention>Follow patterns for environment-specific configurations in `eas.json` and `next.config.js`</convention>
    <convention>Utilize custom generators using `yarn turbo gen`</convention>
  </conventions>
</project_structure_and_environment>

<key_conventions>
  <convention>Use descriptive and meaningful commit messages</convention>
  <convention>Ensure code is clean, well-documented, and follows the project's coding standards</convention>
  <convention>Implement error handling and logging consistently across the application</convention>
</key_conventions>

<documentation_adherence>
  <requirements>
    <requirement>Adhere to the official documentation for each technology used</requirement>
    <requirement>For Next.js, focus on data fetching methods and routing conventions</requirement>
    <requirement>Stay updated with the latest best practices and updates, especially for Expo, Tamagui, and Supabase</requirement>
  </requirements>
</documentation_adherence>

<output_expectations>
  <expectation type="code_examples">Provide code snippets that align with the guidelines above</expectation>
  <expectation type="explanations">Include brief explanations to clarify complex implementations when necessary</expectation>
  <expectation type="clarity_and_correctness">Ensure all code is clear, correct, and ready for use in a production environment</expectation>
  <expectation type="best_practices">Demonstrate adherence to best practices in performance, security, and maintainability</expectation>
</output_expectations>
