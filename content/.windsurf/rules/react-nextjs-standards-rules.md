# React/NextJS + Fullstack Web Development Rules

## React/NextJS Frontend Standards

<react_structure>
- Use Next.js 14+ with App Router for new projects
- Follow React Hook patterns and composition over inheritance
- Use TypeScript for type safety
- Implement proper folder structure: `/app`, `/components`, `/lib`, `/types`
- Use Server Components by default, Client Components when needed
</react_structure>

<component_architecture>
- Use functional components with hooks
- Keep components under 200 lines of code
- Use compound component pattern for complex UI
- Implement proper prop drilling avoidance with Context API
- Use React.memo() for performance optimization
- Example component structure:
  ```typescript
  interface UserCardProps {
    user: User;
    onEdit: (id: string) => void;
  }
  
  const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
    return (
      <div className="user-card">
        <h3>{user.name}</h3>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    );
  };
  ```
</component_architecture>

<nextjs_optimization>
- Use Next.js Image component for optimized images
- Implement proper metadata with generateMetadata
- Use dynamic imports for code splitting
- Leverage Static Site Generation (SSG) when possible
- Use Server-Side Rendering (SSR) for dynamic content
- Implement proper loading states and error boundaries
</nextjs_optimization>

## State Management

<state_management>
- Use Zustand or Redux Toolkit for global state
- Keep local state in components when possible
- Use React Query/TanStack Query for server state
- Implement proper state normalization
- Use Context API for theme and user preferences
- Example Zustand store:
  ```typescript
  interface UserStore {
    users: User[];
    loading: boolean;
    fetchUsers: () => Promise<void>;
    addUser: (user: User) => void;
  }
  
  const useUserStore = create<UserStore>((set) => ({
    users: [],
    loading: false,
    fetchUsers: async () => {
      set({ loading: true });
      const users = await api.getUsers();
      set({ users, loading: false });
    },
    addUser: (user) => set((state) => ({ 
      users: [...state.users, user] 
    }))
  }));
  ```
</state_management>

## API Integration & Data Fetching

<api_integration>
- Use React Query for server state management
- Implement proper error handling and retry logic
- Use SWR for simple data fetching scenarios
- Implement optimistic updates for better UX
- Use proper loading and error states
- Example React Query setup:
  ```typescript
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
  ```
</api_integration>

## Backend & API Development

<backend_architecture>
- Use Next.js API routes or separate Node.js/Express server
- Implement tRPC for end-to-end type safety
- Use Prisma or Drizzle ORM for database operations
- Follow REST API conventions or GraphQL
- Implement proper middleware for authentication
- Example API route:
  ```typescript
  // app/api/users/route.ts
  export async function GET() {
    try {
      const users = await prisma.user.findMany();
      return Response.json(users);
    } catch (error) {
      return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
  }
  ```
</backend_architecture>

<database_practices>
- Use Prisma for type-safe database operations
- Implement proper database schema with relations
- Use database transactions for complex operations
- Implement proper indexing for performance
- Use connection pooling in production
- Example Prisma schema:
  ```prisma
  model User {
    id        String   @id @default(cuid())
    email     String   @unique
    name      String?
    posts     Post[]
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  
  model Post {
    id       String @id @default(cuid())
    title    String
    content  String
    author   User   @relation(fields: [authorId], references: [id])
    authorId String
  }
  ```
</database_practices>

## Authentication & Security

<auth_security>
- Use NextAuth.js for authentication
- Implement proper JWT token handling
- Use bcrypt for password hashing
- Implement rate limiting with next-rate-limit
- Use CSRF protection for forms
- Implement proper CORS configuration
- Use environment variables for secrets
- Example NextAuth configuration:
  ```typescript
  export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          const user = await verifyUser(credentials);
          return user || null;
        }
      })
    ],
    session: { strategy: 'jwt' },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error'
    }
  };
  ```
</auth_security>

## Styling & UI

<styling_guidelines>
- Use Tailwind CSS for utility-first styling
- Implement design system with consistent spacing and colors
- Use CSS modules or styled-components for component-specific styles
- Implement proper responsive design with mobile-first approach
- Use shadcn/ui or Radix UI for accessible components
- Implement dark mode support
- Example Tailwind config:
  ```javascript
  module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            500: '#3b82f6',
            900: '#1e3a8a'
          }
        }
      }
    }
  };
  ```
</styling_guidelines>

## Testing Strategy

<testing_practices>
- Use Jest and React Testing Library for unit tests
- Implement integration tests for API endpoints
- Use Playwright for end-to-end testing
- Test user interactions and accessibility
- Mock external dependencies properly
- Example component test:
  ```typescript
  import { render, screen, fireEvent } from '@testing-library/react';
  import UserCard from './UserCard';
  
  describe('UserCard', () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const mockOnEdit = jest.fn();
    
    it('renders user information', () => {
      render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    it('calls onEdit when edit button is clicked', () => {
      render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
      fireEvent.click(screen.getByText('Edit'));
      expect(mockOnEdit).toHaveBeenCalledWith('1');
    });
  });
  ```
</testing_practices>

## Performance Optimization

<performance_guidelines>
- Use React.memo() for expensive component re-renders
- Implement proper code splitting with dynamic imports
- Use Next.js Image optimization
- Implement virtual scrolling for large lists
- Use useMemo and useCallback for expensive computations
- Implement proper bundle analysis with @next/bundle-analyzer
- Use React DevTools Profiler for performance debugging
</performance_guidelines>

## Development Workflow

<development_practices>
- Use ESLint, Prettier, and TypeScript for code quality
- Implement pre-commit hooks with Husky and lint-staged
- Use conventional commits for consistent commit messages
- Implement proper CI/CD with GitHub Actions or Vercel
- Use Docker for containerization
- Example package.json scripts:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "jest",
      "test:watch": "jest --watch",
      "type-check": "tsc --noEmit"
    }
  }
  ```
</development_practices>

## Deployment & Infrastructure

<deployment_guidelines>
- Use Vercel for Next.js applications (recommended)
- Implement proper environment variable management
- Use CDN for static assets
- Implement proper monitoring with Vercel Analytics
- Use database hosting with PlanetScale or Supabase
- Implement proper error tracking with Sentry
- Use logging with structured format
</deployment_guidelines>

## Code Quality Standards

<quality_standards>
- Follow React best practices and hooks rules
- Use TypeScript strict mode
- Implement proper error boundaries
- Use meaningful component and function names
- Keep functions pure and side-effect free
- Document complex business logic
- Use proper TypeScript types and interfaces
</quality_standards>

## References
- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev/
- React Query: https://tanstack.com/query/latest
- Zustand: https://zustand.surge.sh/
- Prisma: https://www.prisma.io/docs
- NextAuth.js: https://next-auth.js.org/
- Tailwind CSS: https://tailwindcss.com/docs