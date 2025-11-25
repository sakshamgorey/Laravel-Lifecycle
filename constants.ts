import { Stage } from './types';

export const LARAVEL_STAGES: Stage[] = [
  {
    id: 1,
    title: "public/index.php",
    description: "The entry point for all requests. It loads the Composer autoloader and retrieves the Laravel application instance.",
    docLink: "https://laravel.com/docs/11.x/lifecycle#first-steps"
  },
  {
    id: 2,
    title: "bootstrap/app.php",
    description: "Bootstraps the framework and handles exceptions. It returns the application instance to the caller.",
    docLink: "https://laravel.com/docs/11.x/lifecycle"
  },
  {
    id: 3,
    title: "HTTP Kernel",
    description: "Handles the incoming request, executing bootstrapper classes (env detection, config loading, etc.).",
    docLink: "https://laravel.com/docs/11.x/lifecycle#http-kernel"
  },
  {
    id: 4,
    title: "Service Providers",
    description: "The heart of the bootstrapping process. All core services (DB, Queue, Validation) are registered and booted here.",
    docLink: "https://laravel.com/docs/11.x/providers"
  },
  {
    id: 5,
    title: "Global Middleware",
    description: "Middleware that runs on every request (e.g., Session start, CSRF verification) before routing.",
    docLink: "https://laravel.com/docs/11.x/middleware"
  },
  {
    id: 6,
    title: "Route Resolution",
    description: "The router matches the URL to a defined route and gathers any route-specific middleware.",
    docLink: "https://laravel.com/docs/11.x/routing"
  },
  {
    id: 7,
    title: "Controller / Closure",
    description: "The application logic is executed. This is where your specific code handles the request.",
    docLink: "https://laravel.com/docs/11.x/controllers"
  },
  {
    id: 8,
    title: "Service Container",
    description: "Dependencies required by the controller are automatically resolved and injected.",
    docLink: "https://laravel.com/docs/11.x/container"
  },
  {
    id: 9,
    title: "Response Creation",
    description: "The route returns a response object (View, JSON, etc.) which travels back through the middleware.",
    docLink: "https://laravel.com/docs/11.x/responses"
  },
  {
    id: 10,
    title: "Terminable Middleware",
    description: "Middleware can perform work after the response has been prepared but before it is sent.",
    docLink: "https://laravel.com/docs/11.x/middleware#terminable-middleware"
  },
  {
    id: 11,
    title: "Send Response",
    description: "The final HTTP response is sent to the user's browser via the web server.",
    docLink: "https://laravel.com/docs/11.x/lifecycle"
  },
  {
    id: 12,
    title: "Terminate",
    description: "Cleanup tasks. The `terminate()` method is called on any middleware that implements it.",
    docLink: "https://laravel.com/docs/11.x/lifecycle"
  }
];
