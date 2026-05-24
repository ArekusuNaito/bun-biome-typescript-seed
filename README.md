# bun + biome seed

A general-purpose TypeScript project template. Uses Bun as the runtime and package manager, Biome for linting and formatting, and mise to pin the Bun version so every engineer on the team runs the same thing.

---

## For engineers

### Prerequisites

Install [mise](https://mise.jdx.dev) if you don't have it. mise manages the Bun version for you — no manual installs needed.

```bash
# macOS / Linux
curl https://mise.run | sh
```

### Get started

```bash
# 1. Clone and enter the project
git clone <repo-url>
cd <project-name>

# 2. Let mise install the correct Bun version (1.3.9)
mise install

# 3. Install dependencies
bun install
```

That's it. You now have Bun 1.3.9 active and Biome installed.

### Daily commands

| What you want to do | Command |
|---|---|
| Run the project (with auto-reload) | `bun run dev` |
| Run tests once | `bun test` |
| Run tests and watch for changes | `bun run test:watch` |
| Fix lint and format issues automatically | `bun run check` |
| Only lint | `bun run lint` |
| Only format | `bun run format` |
| Build for production | `bun run build` |

Run `bun run check` before every commit. It fixes most issues in one shot.

### Project structure

```
src/
  index.ts        # Your entrypoint
  index.test.ts   # Tests live next to the code they test
dist/             # Build output — do not commit this
mise.toml         # Pins Bun to 1.3.9
biome.json        # Lint and format rules
tsconfig.json     # TypeScript config
```

### Linting and formatting rules (short version)

- Double quotes, 2-space indent, 100-character line width.
- `var` is banned — use `const`.
- Unused variables and imports are errors, not warnings.
- `any` is an error. Use `unknown` and narrow the type.
- `console.log` is a warning. Remove debug logs before committing.
- Imports are sorted automatically.

Biome enforces all of this. If `bun run check` passes, you're clean.

### TypeScript path alias

Use `~/` to import from `src/` without relative path chains.

```ts
// Instead of: import { foo } from "../../utils/foo"
import { foo } from "~/utils/foo";
```

---

## For AI agents

### Stack

| Tool | Version | Role |
|---|---|---|
| Bun | 1.3.9 (pinned via mise) | Runtime, package manager, test runner, bundler |
| Biome | 1.9.4 | Linter + formatter (replaces ESLint + Prettier) |
| TypeScript | ESNext, strict | Type checker |
| mise | system | Version manager for Bun |

### Invariants

- `"type": "module"` — the project is ESM only. Do not use `require()`.
- `moduleResolution: "bundler"` — Bun resolves modules; do not add `.js` extensions to local imports.
- `noUncheckedIndexedAccess: true` — array and object index access returns `T | undefined`. Guard before using.
- `exactOptionalPropertyTypes: true` — do not assign `undefined` to optional properties explicitly.
- Test files sit next to their source file (`foo.ts` / `foo.test.ts`). No `__tests__` directories.

### Adding dependencies

```bash
bun add <package>          # runtime dependency
bun add -d <package>       # dev dependency
```

### Running checks

```bash
bun run check              # lint + format + import sort (auto-fix)
bun test                   # run all *.test.ts files
bun run build              # bundle to dist/
```

All three must pass before a commit is valid.

### Biome rule surface (active errors)

| Rule | Severity |
|---|---|
| `noUnusedVariables` | error |
| `noUnusedImports` | error |
| `noVar` | error |
| `useConst` | error |
| `useTemplate` | error |
| `noExplicitAny` | error |
| `noConsole` | warn |

### Path alias

`~/*` resolves to `src/*`. Use it for all non-relative imports inside `src/`.

### Extending this seed

- Add a new module under `src/`. No configuration changes required.
- Add a new script to `package.json` under `"scripts"`.
- To add a Biome rule, edit `biome.json` under `linter.rules`.
- To change TypeScript strictness, edit `tsconfig.json` under `compilerOptions`.
- To upgrade Bun, change the version in `mise.toml` and run `mise install`.
