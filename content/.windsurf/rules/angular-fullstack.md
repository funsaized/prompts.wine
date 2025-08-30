# Angular + Fullstack Web Development Rules

## Angular Frontend Standards

<angular_structure>
- Use Angular CLI for project scaffolding: `ng new project-name --routing --style=scss`
- Follow Angular Style Guide (https://angular.io/guide/styleguide)
- Use OnPush change detection strategy for performance
- Implement lazy loading for feature modules
- Use standalone components for Angular 14+ projects
</angular_structure>

<component_architecture>
- Use smart/dumb component pattern
- Keep components under 400 lines of code
- Use reactive forms over template-driven forms
- Implement proper lifecycle hooks (OnInit, OnDestroy)
- Use trackBy functions in *ngFor loops for performance
</component_architecture>

<typescript_practices>
- Enable strict mode in tsconfig.json
- Use interfaces for type definitions
- Implement proper error handling with RxJS catchError
- Use readonly properties where applicable
- Leverage union types and generics effectively
</typescript_practices>

## State Management

<state_management>
- Use NgRx for complex state management
- Implement CQRS pattern with Actions, Reducers, Effects
- Use selectors for derived state
- Keep state normalized and immutable
- Example structure:
  ```typescript
  interface AppState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  ```
</state_management>

## HTTP & API Integration

<api_integration>
- Use HttpClient with proper interceptors
- Implement retry logic with exponential backoff
- Use RxJS operators: map, filter, switchMap, debounceTime
- Handle errors gracefully with global error handler
- Cache API responses when appropriate
- Example interceptor:
  ```typescript
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(authReq);
  }
  ```
</api_integration>

## Backend Integration

<backend_architecture>
- Use NestJS for Node.js backend or .NET Core
- Implement Clean Architecture principles
- Use dependency injection consistently
- Follow REST API conventions or GraphQL
- Implement proper authentication (JWT, OAuth2)
</backend_architecture>

<database_practices>
- Use TypeORM or Prisma for database operations
- Implement proper migrations and seeding
- Use connection pooling for performance
- Implement soft deletes where applicable
- Example entity:
  ```typescript
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;
  }
  ```
</database_practices>

## Security Best Practices

<security_guidelines>
- Implement Content Security Policy (CSP)
- Use HTTPS in production
- Sanitize user inputs
- Implement rate limiting on API endpoints
- Use environment variables for sensitive data
- Implement proper CORS configuration
- Use Angular's built-in XSS protection
</security_guidelines>

## Testing Strategy

<testing_practices>
- Write unit tests with Jest/Jasmine
- Use TestBed for Angular component testing
- Implement integration tests for API endpoints
- Use Page Object Model for e2e tests
- Maintain minimum 80% code coverage
- Example component test:
  ```typescript
  describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UserComponent]
      });
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  ```
</testing_practices>

## Performance Optimization

<performance_guidelines>
- Use OnPush change detection strategy
- Implement virtual scrolling for large lists
- Use Angular's built-in lazy loading
- Optimize bundle size with tree shaking
- Use service workers for caching
- Implement proper memory management (unsubscribe from observables)
- Use Angular DevTools for performance profiling
</performance_guidelines>

## Development Workflow

<development_practices>
- Use Git flow or feature branch workflow
- Implement pre-commit hooks with Husky
- Use ESLint and Prettier for code formatting
- Implement CI/CD with GitHub Actions or Azure DevOps
- Use Docker for containerization
- Example Docker setup:
  ```dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  RUN npm run build
  EXPOSE 4200
  CMD ["npm", "start"]
  ```
</development_practices>

## Deployment & Infrastructure

<deployment_guidelines>
- Use Azure, AWS, or Vercel for hosting
- Implement proper environment configurations
- Use CDN for static assets
- Implement health checks for APIs
- Use monitoring tools (Application Insights, Sentry)
- Implement logging with structured format
- Use database migrations for schema changes
</deployment_guidelines>

## Code Quality Standards

<quality_standards>
- Follow SOLID principles
- Use dependency injection for loose coupling
- Implement proper error boundaries
- Use meaningful variable and function names
- Keep functions pure and side-effect free where possible
- Document complex business logic
- Use TypeScript strict mode
</quality_standards>

## References
- Angular Style Guide: https://angular.io/guide/styleguide
- RxJS Best Practices: https://blog.angular.io/rxjs-best-practices-7f559d811514
- NgRx Documentation: https://ngrx.io/guide/store
- NestJS Documentation: https://docs.nestjs.com/
- Angular Performance Guide: https://angular.io/guide/performance-checklist
