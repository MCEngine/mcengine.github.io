# Agent Instructions & Workflow

This repository is the MCEngine organization website, served by GitHub Pages from `docs/`. It also hosts the shared theme assets (`.css` and `.js`) that every MCEngine ecosystem site imports through `https://mcengine.github.io/...` URLs. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

**Strict Rules & Execution**
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` (if present) to understand the core project goals and context.
* **Design:** The site uses the shared MCEngine ecosystem theme (white/silver/modern, no dark theme). The design system is defined in `DESIGN.md` of `MCPaimon/mcpaimon.github.io`; never change the shared theme outside of what that document allows, and update it first if a style change is requested. Changing the shared assets here affects every consumer site — update all consumers listed in `INDEX.md` in the same change set when asset paths change.
* **Content:** The website explains how the MCEngine ecosystem works. Pages must stay explanatory; do not embed source code listings inside the website pages.
* **Static Only:** GitHub Pages serves static files from `docs/`. Use plain HTML, CSS, and JavaScript with no build step and no external runtime dependencies.
* **No `.nojekyll`:** Never create `.nojekyll` files anywhere in this repository. GitHub Pages serves the site's static files without them.
* **Execution:** Create a solid plan. Write content section-by-section. Verify pages render correctly and links resolve before completing the task.
* **No Master/Main:** Never work directly on `master` or `main`. Create a new branch if the task scope changes; otherwise, continue on the active branch.

**Git & Branching Workflow (STRICT)**
* **Branch Naming:** Must follow `{type}/{primary-noun}` (e.g., `docs/homepage`). Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
* **Branch Coverage:** Branch names must reflect the entire set of changes on the branch, not only a subset of the work.
* **Commit Frequency & Verification:** Commit each change or group related changes. Do not wait for the entire session to finish. Always check the diff before creating a commit.
* **Commits:** Must use Conventional Commits (`type[optional scope]: description`). Commit messages must be plain text with no links or Jira IDs.
* **Pull Requests (PR):** Open sequentially. Always ask for user approval first. Provide a detailed report of added/modified/deleted features in the PR body. PR titles use human-readable language, not git conventions.
