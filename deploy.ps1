$HOST_NAME = "acewealth.midasx.in"  # Change this to your actual cPanel hostname if different
$USER_NAME = "cpanel_username"      # Replace with your cPanel Username
$API_TOKEN = "your_api_token"       # Replace with your cPanel API token

$AUTH = "cpanel ${USER_NAME}:${API_TOKEN}"
$HEADERS = @{ "Authorization" = $AUTH }

Write-Host "Deploying Frontend Files to cPanel..." -ForegroundColor Cyan

# Define the cPanel upload endpoint
$UPLOAD_URL = "https://${HOST_NAME}:2083/execute/Fileman/upload_files"

# Upload core files to public_html
Invoke-RestMethod -Uri $UPLOAD_URL -Method Post -Headers $HEADERS -Form @{
    dir         = "public_html"
    "file-1"    = Get-Item ".\dist\public\index.html"
    "file-2"    = Get-Item ".\dist\public\.htaccess"
    "file-3"    = Get-Item ".\dist\public\change_log.md"
    overwrite   = "1"
} -SkipCertificateCheck

Write-Host "Core files published!" -ForegroundColor Green

# Upload assets (CSS/JS) to public_html/assets
$AssetFiles = Get-ChildItem ".\dist\public\assets" -File
$AssetForm = @{
    dir       = "public_html/assets"
    overwrite = "1"
}

$i = 1
foreach ($file in $AssetFiles) {
    $AssetForm["file-$i"] = Get-Item $file.FullName
    $i++
}

Invoke-RestMethod -Uri $UPLOAD_URL -Method Post -Headers $HEADERS -Form $AssetForm -SkipCertificateCheck

Write-Host "Assets successfully published! Deployment complete!" -ForegroundColor Green
