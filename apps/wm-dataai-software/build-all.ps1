# Builds every app in apps/<slug> into public/<slug> with base=/<slug>/.
# Each app is a self-contained Vite/React project exported from Google AI Studio.
# Re-run any time an app's source changes; safe to run repeatedly.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$apps = Get-ChildItem (Join-Path $root "apps") -Directory
foreach ($app in $apps) {
  $slug = $app.Name
  Write-Output "==================== $slug ===================="
  Push-Location $app.FullName
  try {
    if (-not (Test-Path "node_modules")) {
      Write-Output "[$slug] npm install..."
      npm install --no-audit --no-fund --loglevel=error
    }
    $out = Join-Path $root "public\$slug"
    Write-Output "[$slug] vite build --base=/$slug/ ..."
    npx vite build --base="/$slug/" --outDir $out --emptyOutDir
  } finally {
    Pop-Location
  }
}
Write-Output "ALL BUILDS COMPLETE"
