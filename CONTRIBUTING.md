# Contributing

Hello. Thank you for your willingness to improve and extend `@bundle-validator` ecosystem !

Here is everything you need to configure repo on your machine and start making changes.

This is a monorepo, and it uses [pnpm](https://pnpm.io/).  
You should follow usual pnpm workflow:

1. `git clone` repo
2. Run `pnpm install`

# Commands

## Running tests

Run `pnpm test` in monorepo root. We use [Turborepo](https://turborepo.org/), which means you will see cached output from the last tests run in you have no changes in code.

In case you need to run tests only for a single package, you can execute `pnpm test` command in the folder of that package.

## Starting from scratch

You can remove all intermediate output directories and `node_modules` by executing `pnpm run prune` command.

## Formatting files

We use Prettier. To run Prettier, execute `pnpm run format` command.

# Preparing your Pull Request

This repo uses [changesets](https://github.com/changesets/changesets). Thus, make sure to include changeset files in your pull request.  
Please go through [Adding a changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) page to understand how to craft a new changeset file.  
This repo has changesets CLI install, so you can use `pnpm changeset` command to generate a new changeset.

# Publishing a new version

Maintainers are responsible for releases.

The only action from contributor is adding a changeset file describing the change.

As soon as someone's merge request with included changeset file gets merged, GitHub Actions automatically opens a version bump merge request. Maintainers merge that merge request and publish new package versions from their machine.
