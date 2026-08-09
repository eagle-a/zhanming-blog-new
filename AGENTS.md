<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AI article submission

When the user asks an AI agent to publish an article, the agent must use the approval queue documented in `docs/AI_SUBMISSION_GUIDE.md`.

- Create a Markdown file with the required frontmatter.
- Run `pnpm agent:submit <path-to-markdown>`.
- Run the AI process as the ordinary interactive Windows user, never as Administrator. An elevated AI defeats the local privilege boundary.
- Use only the fixed `zhanming-blog-submit` named pipe through `pnpm agent:submit`. Never call the Agent HTTP API or administrator endpoints directly.
- Never read or modify the Windows certificate store, the private-key container, `%ProgramData%\ZhanmingBlogSubmitBroker`, administrator credentials, Neon credentials, or Blob credentials.
- Never run `agent:setup-local`, `agent:install-broker`, or `agent:uninstall-broker`; those are explicit, human-operated system administration steps.
- Never write directly to Neon or Blob and never approve a submission.
- A successful submission returns `status: pending`. Tell the user to review it at `/admin/review`; do not claim it is publicly published until an administrator approves it.
