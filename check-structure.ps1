# Remove only the files/folders that were auto-created
$structure = @(
    "app/(auth)/sign-in/",
    "app/(auth)/sign-up/",
    "app/(main)/dashboard/documents/page.tsx",
    "app/(main)/dashboard/ingest/page.tsx",
    "app/(main)/dashboard/query/page.tsx",
    "app/(main)/dashboard/users/page.tsx",
    "app/(main)/dashboard/page.tsx",
    "app/(main)/layout.tsx",
    "app/layout.tsx",
    "app/page.tsx",

    "components/dashboard/analytics/StatCard.tsx",
    "components/dashboard/analytics/DocumentTypeChart.tsx",
    "components/dashboard/documents/DocumentTable.tsx",
    "components/dashboard/documents/DeleteDocumentButton.tsx",
    "components/dashboard/documents/DocumentFilters.tsx",
    "components/dashboard/ingest/IngestForm.tsx",
    "components/dashboard/query/ChatWindow.tsx",
    "components/dashboard/query/SourceDocument.tsx",
    "components/dashboard/shared/PageHeader.tsx",
    "components/dashboard/shared/DataTable.tsx",
    "components/ui/button.tsx",
    "components/ui/card.tsx",
    "components/ui/input.tsx",

    "lib/api-client.ts",
    "lib/schemas.ts",
    "lib/types.ts",

    "hooks/useDocuments.ts",
    "hooks/useAnalytics.ts",

    "middleware.ts",
    "globals.css"
)

foreach ($item in $structure) {
    $path = Join-Path -Path (Get-Location) -ChildPath $item
    if (Test-Path $path) {
        Write-Host "Removing: $path"
        Remove-Item -Path $path -Force -Recurse
    }
}
