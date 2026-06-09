.PHONY: help clone pull switch commit push

ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
CLONE_URL := $(word 1,$(ARGS))
SWITCH_TAG := $(word 1,$(ARGS))
SWITCH_ARGS := $(wordlist 2,$(words $(ARGS)),$(ARGS))

help: ## Show available commands and descriptions
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z0-9_-]+:.*## / {printf "%-16s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

clone: ## Clone and tag a repository: make clone <repo-url>
	@if [ -z "$(CLONE_URL)" ]; then \
		cd apps; \
		gitopolis clone; \
		exit 0; \
	fi
	@cd apps && \
	repo_name="$$(basename "$(CLONE_URL)" .git)"; \
	gitopolis clone "$(CLONE_URL)" && \
	gitopolis tag "$$repo_name" "$$repo_name" && \
	touch .gitignore && \
	if ! grep -Fxq "$$repo_name" .gitignore; then printf '\n%s\n' "$$repo_name" >> .gitignore; fi

switch: ## Run git switch in a service container: make switch <tag> [git-switch-args...]
	@if [ -z "$(SWITCH_TAG)" ]; then \
		echo "Usage: make switch <tag> [git-switch-args...]"; \
		exit 1; \
	fi
	@cd apps && \
	gitopolis exec -t "$(SWITCH_TAG)" -- git switch $(SWITCH_ARGS)

pull: ## Pull latest changes (implementation pending)

commit: ## Commit changes (implementation pending)

push: ## Push changes to remote (implementation pending)

%:
	@:
