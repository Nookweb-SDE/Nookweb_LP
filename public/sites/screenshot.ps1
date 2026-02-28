param([string]$OutputFile, [int]$CropY = 80)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Start-Sleep -Milliseconds 300

$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bitmap = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen([System.Drawing.Point]::Empty, [System.Drawing.Point]::Empty, $screen.Size)

$cropW = 1280
$cropH = 853
$cropX = [int][Math]::Max(0, ($screen.Width - $cropW) / 2)
$rect = New-Object System.Drawing.Rectangle($cropX, $CropY, $cropW, $cropH)
$cropped = $bitmap.Clone($rect, $bitmap.PixelFormat)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 90L)
$cropped.Save($OutputFile, $codec, $ep)

Write-Host "Salvo: $OutputFile"
