# wm-ai-lab-host-apps-vm-34

Shared-host VM repository for `wm-dataai-software`.

## Routes

- Local: `http://localhost:3034/secure/apps/34/wm-dataai-software/`
- Cloud production: `https://westmonroe-cloud.com/secure/apps/34/wm-dataai-software/`
- Cloud API health: `/secure/apps/34/wm-dataai-software/api/health`
- Agents production: `https://agents.westmonroe.ai/wm-dataai-software/`
- Agents API health: `/wm-dataai-software/api/health`

## Local Validation

```sh
docker compose config
docker compose -f docker-compose.production.yml config
docker compose -f docker-compose.agents.yml config
docker compose up --build -d
curl -i http://localhost:3034/secure/apps/34/wm-dataai-software/
curl -i http://localhost:3034/secure/apps/34/wm-dataai-software/api/health
```
