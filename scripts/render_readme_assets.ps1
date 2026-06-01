$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Cost Takeout Command Center", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for cost takeout" -Subtitle "One executive brief for cuts, consolidations, protected lanes, execution blockers, and annual savings." -Bullets @(
  "The overview keeps the strongest cut, consolidate, protect, and hold lanes visible in one committee-safe surface.",
  "Leadership can see where savings land fastest and where blocker evidence still makes the takeout story fragile.",
  "This layer turns scattered scorecards into one takeout packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Takeout queue keeps owner, audience, action, and theme connected" -Subtitle "Every route retains the owner, audience, action, spend category, takeout theme, and next move." -Bullets @(
  "The takeout-queue view makes it obvious which systems should be cut, consolidated, protected, or held next.",
  "Board questions stay attached to actual savings themes and continuity-risk boundaries.",
  "Leadership can tighten the committee packet before the next board, investor, or cost review begins."
) -OutputPath (Join-Path $screenshots "02-takeout-queue-proof.png")

New-ScenarioImage -Title "Savings owners show which lanes can deliver takeout cleanly" -Subtitle "Savings realization, owner clarity, annual savings, and company-tag traces stay visible in one decision readout." -Bullets @(
  "This view keeps procurement, AI, and revenue takeout candidates tied to actual owners instead of abstract cuts.",
  "Weak savings stories stay visible before the committee announces savings that no one can truly land.",
  "Leadership can see which move will deliver takeout fastest without creating hidden ownership gaps."
) -OutputPath (Join-Path $screenshots "03-savings-owners-proof.png")

New-ScenarioImage -Title "Execution blockers keep risk and urgency together" -Subtitle "Continuity risk, board defensibility, urgency, and blocker proof stay grounded in the same operating view." -Bullets @(
  "The executive story stays tied to actual blockers instead of vague efficiency language.",
  "Thin proof remains visible before it turns into another inconclusive board discussion.",
  "This creates a repeatable packet that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-execution-blockers-proof.png")
