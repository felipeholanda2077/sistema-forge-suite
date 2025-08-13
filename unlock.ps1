$directory = "c:\Users\felip\arcane-forge-suite\backend"
$handleExe = "$env:USERPROFILE\Downloads\handle.exe"

# Download Handle utility if not present
if (-not (Test-Path $handleExe)) {
    Write-Host "Downloading Handle utility..."
    $url = "https://download.sysinternals.com/files/Handle.zip"
    $zipPath = "$env:TEMP\Handle.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force
    Copy-Item "$env:TEMP\Handle\handle64.exe" -Destination $handleExe -Force
}

# Find processes locking the directory
Write-Host "Finding processes locking the directory..."
& $handleExe -a $directory | Select-String -Pattern "^(\S+)\s+pid:" | ForEach-Object {
    $processId = $_.Matches.Groups[1].Value
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Found process locking the directory: $($process.ProcessName) (PID: $processId)"
        $process | Stop-Process -Force
        Write-Host "Stopped process: $($process.ProcessName) (PID: $processId)"
    }
}

# Try removing the directory again
Write-Host "Attempting to remove directory..."
Remove-Item -Path $directory -Recurse -Force -ErrorAction SilentlyContinue

if (Test-Path $directory) {
    Write-Host "Failed to remove directory. It may be locked by a system process."
} else {
    Write-Host "Successfully removed the directory."
}
