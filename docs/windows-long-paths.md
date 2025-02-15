# Windows Long Path Solutions

To resolve path length limitations when building React Native apps with Reanimated on Windows, you have several options:

## 1. Enable Windows Long Paths

### Option A: Using PowerShell (Recommended)
Run PowerShell as Administrator and execute:
```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1
```

### Option B: Using Group Policy Editor
1. Open `gpedit.msc`
2. Navigate to: Computer Configuration > Administrative Templates > System > Filesystem
3. Enable "Enable Win32 long paths"

### Option C: Using Registry Editor
1. Press Win + R to open the Run dialog
2. Type "regedit" and press Enter
3. Navigate to: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
4. Find or create a DWORD value named `LongPathsEnabled`
5. Set its value to `1`
6. Restart your computer

### Option D: Using Command Prompt
Run Command Prompt as Administrator and execute:
```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\FileSystem" /v LongPathsEnabled /t REG_DWORD /d 1 /f
```

## 2. Project Path Management

### Shorten Project Path
Move the project to a shorter path like `C:\TB` or `C:\Projects` instead of deep nested folders in your user directory.

### Use Virtual Drive Mapping
Map your project to a shorter virtual drive path:
```cmd
subst X: C:\your\long\project\path
```
Then access your project via `X:\` instead of the full path.

## Additional Notes

- A system restart is required after enabling long paths
- The Windows default path length limit is 260 characters
- Some tools may still have issues with long paths even after enabling this setting
- Using WSL2 for builds can bypass Windows path limitations entirely
