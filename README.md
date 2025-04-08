# Template Bun

A template for creating a Bun TypeScript project in my personal style.

It has my custom CI/CD setup and containerization for easy deployment.

### Local Development

_Ensure to rename the `name` property in `package.json` to your project name, this should also matche the repo name. This is important for the CI/CD pipeline._

`bun dev` - Starts the development server.

### GitHub Actions

This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci.yml`.

The workflow is triggered on commits to the `main` branch. A container is built and pushed to the repository.

### Production

The production environment is set up to use the container built in the CI/CD pipeline. The container is deployed to a server using Docker Compose.

A webhook is set up to trigger the deployment when a new container is pushed to the repository.
