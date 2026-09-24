<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AI article submission

When the user asks an AI agent to publish an article, the agent must use the approval queue documented in `docs/PUBLISHING_GUIDE.md`.

- Create a Markdown file with the required frontmatter.
- Run `pnpm agent:submit <path-to-markdown>` with a one-time submission code that the human administrator generated at `/admin/review` and handed over. The CLI talks to the site's Agent HTTP API over HTTPS; it never needs Neon or Blob credentials.
- Run the AI process as the ordinary interactive Windows user, never as Administrator. An elevated AI defeats the local privilege boundary.
- Never generate or revoke submission tickets, and never call administrator endpoints directly; only the submission endpoint through the CLI.
- Never read or modify the Windows certificate store, the private-key container, `%ProgramData%\ZhanmingBlogSubmitBroker`, administrator credentials, Neon credentials, or Blob credentials.
- Never run `agent:setup-local`, `agent:install-broker`, or `agent:uninstall-broker`; those are explicit, human-operated system administration steps.
- Never write directly to Neon or Blob and never approve a submission.
- A successful submission returns `status: pending`. Tell the user to review it at `/admin/review`; do not claim it is publicly published until an administrator approves it.

## Deployment

Production releases go through Vercel, not GitHub CI/CD. See `docs/DEPLOYMENT_GUIDE.md`.

- Use `pnpm deploy:production`; it runs the local quality gate and then `vercel deploy --prod` from a `git archive` snapshot of the exact commit.
- Do not run bare `vercel deploy --prod`, and do not add `--skip-check` unless the user explicitly asks for it.
- Deployment needs a clean working tree on `main`. Pushing is recommended but no longer enforced, and GitHub Actions no longer gates releases.
