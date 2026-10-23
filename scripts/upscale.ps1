Add-Type -AssemblyName System.Drawing

function Upscale-Image($srcPath, $destPath, $scale) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $newW = [int]($src.Width * $scale)
    $newH = [int]($src.Height * $scale)
    $dest = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($src, 0, 0, $newW, $newH)
    $g.Dispose()
    $src.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]98)
    $dest.Save($destPath, $codec, $encoderParams)
    $dest.Dispose()
    Write-Host "Upscaled $srcPath to $newW x $newH (saved to $destPath)"
}

Upscale-Image 'public\scenes\night-real.jpg' 'public\scenes\night-real-2k.jpg' 2.0
Upscale-Image 'public\scenes\office-real.jpg' 'public\scenes\office-real-2k.jpg' 2.0
Upscale-Image 'public\scenes\sun-real.jpg' 'public\scenes\sun-real-2k.jpg' 2.0
