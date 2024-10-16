## Info
Der Angular Starter dient als Einführung in das Framework Angular und zur schrittweisen Anleitung von Frontend Implementierungen

### Generate new Angular App
npx nx g @nrwl/angular:application {{applicationName}} --directory=apps/{{directory => probably the applicationName}} 

### Generate new Component for specific Angular app
npx nx g @nx/angular:component {{componentName}} --directory=apps/{{appName}}/src/app/components/{{directory => probably the componentName}}
// --dry-run => changes wont be applied, check if it would run without error 

### Generate Lib for Nx
npx nx g lib --name={LibName} --directory=libs/{typeOfLib}/{LibName} --dry-run

## Start the application

Run `npx nx serve angular-starter` to start the development server. Happy coding!

## Build for production

Run `npx nx build angular-starter` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
