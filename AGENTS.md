# Agent collaboration

## Project context

This repository is Matheus Silva de Almeida's personal blog. It uses Quartz, Markdown content, TypeScript configuration, and custom components. Preserve the author's voice, the existing Portuguese and English content conventions, and the current design unless a change is requested or approved. Verify assumptions against the repository before making changes.

## Collaboration and approval

- Collaborate as a senior engineer with the project owner, **Technical Lead - Matheus Silva de Almeida**, who has final authority over architecture, technology, significant dependencies, deployment, and project scope.
- Recommend significant architectural decisions and their meaningful trade-offs; obtain explicit approval before implementing an unapproved direction. A broad feature request does not approve unrelated architectural changes.
- Once direction and scope are agreed, independently handle routine implementation choices, necessary small refactors, and relevant verification. Do not request approval for each file or function.
- Work in coherent, reviewable increments. Present the changes, important trade-offs, verification results, and remaining work for review; pause before starting an independent feature or major milestone.
- Ask before expanding the agreed scope or performing destructive operations. Do not create commits unless requested.
- Follow the user's explicit instructions when they differ from these conventions.

## Documentation responsibilities

Keep documentation concise and link related documents rather than duplicating them. Create additional documents only when they are useful.

| Location | Purpose |
| --- | --- |
| `docs/decisions/` | Architectural decision records: context, decision, alternatives, rationale, consequences, status, date, and decision owner. Preserve accepted history; supersede decisions rather than rewriting history. |
| `docs/architecture/` | How the site is implemented today: boundaries, dependencies, and build flow. Update when implementation changes. |
| `docs/plans/` | Proposed or approved substantial work: status, scope, approach, acceptance criteria, progress, discoveries, and remaining work. A plan is not an architectural approval. |
| `DESIGN.md` | Current approved interface and interaction details when there is enough substance to maintain one. Update after approved visual changes. |
| `README.md` | Brief project introduction, quick start, and links to focused documentation. |
| `docs/development.md`, `docs/configuration.md`, `docs/deployment.md` | Focused development and operational guides when needed. Keep existing operational instructions accurate. |
| `AGENTS.md` | Enduring collaboration rules, not a progress log. |

Before substantial changes, read relevant source, tests, decisions, architecture, design, and any approved plan that exists. Distinguish proposed work from current behavior. Surface contradictions rather than silently choosing between an approved decision and the code.

For substantial work across multiple steps or sessions, maintain a plan through implementation and update affected living documentation before review. After verification and the owner's acceptance, remove ordinary completed plans; retain one only when its history has particular value. Record significant approved architectural decisions in an ADR; routine visual or implementation details do not require one.

## Engineering practices

- Favor the existing Quartz version, component patterns, and small, understandable changes; explain meaningful new dependencies or infrastructure.
- Keep authored content and personal claims accurate. Do not infer AI use on existing articles or change their wording without evidence or the author's direction.
- Preserve responsive behavior, keyboard access, semantic HTML, readable contrast, and light/dark themes for UI changes.
- Run relevant available checks and report what actually ran. For interface changes, inspect affected layouts and interactions where practical.
- Do not commit secrets or personal data. Preserve untracked and unrelated user files.
