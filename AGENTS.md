Every AI must read `llms.txt` first and obey this priority: § rules > $$ rules > STRATEGY > rest of the file and repo.

Do not edit § rules, $$ rules, or STRATEGY. Only the human owner (Falk) or the Strategic Advisor agent may change STRATEGY.

After every update to `llms.txt` or this file (`AGENTS.md`), commit and push on a feature branch and open/update the PR. Do not leave either file as a local-only change.

Cursor implements: Cursor cloud agents write code and open/update PRs. Grok Bot (Strategic Advisor) is not the coder. Read `llms.txt` section Arbeitsverteilung.
