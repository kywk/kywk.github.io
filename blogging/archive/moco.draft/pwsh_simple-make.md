---
title: "PowerShell: simple-make.ps1"
date: 2021-05-25T15:45:22+08:00
images: ["https://lh3.googleusercontent.com/pw/ACtC-3faQmucvyg0MPMu9r8stEbrHOZYGRcmuuEbeZbGK_b0vqViUDnGYeFNu1hMUGREMaBigao3ll7dr9Us72fXfnPOQ_zvnq5eCsA8WL7m6J_4476kh82TiUbrsGw-3FxqsJ2gGyqU1QHKcl6pgEbyQmAnwg=w800-no?authuser=0"]
categories: ["powershell"]
tags: ["powershell", "script"]
toc: false
---

日前遇到一個大型舊專案要導入 CI/CD, 該專案檔案結構為數千個獨立小程式所組成,
而專案並沒有集成的 Makefile / .sln / .proj / ... 之類專案檔一次完成全部程式編譯, 
需針對每個獨立程式進行編譯後部署.
又獨立程式過多, 若每次 CI/CD 時都需全部重新編譯, 過於耗時.

因其他因素無法撰寫 Makefile 來判斷是否需重新編譯,
也無法使用習慣的 node.js / golang / ... 等語言進行腳本開發.
最後選擇是透過 PowerShell 硬幹.

Windows 環境上, 之前只寫過簡單 BAT 來處理大量繁瑣的指令動作, 複雜腳本是第一次接觸. 
邊找資料, 邊踩坑, 在觀念尚不見得完全正確理解下, 完成需求開發. 小小筆記於此.


### simple-make.ps1 ###

以下為去掉專案相關資訊的 pseudo code, 僅作為程式邏輯思維用.

``` powershell
$BUILD_ROOT = "~/project/sandbox"
$DIR_SPLIT = "\"

$ProjHashtable = @{
    Root     = ""
    CodeName = ""
    DLLFile  = ""
    SRCFile  = ""
}
$toUpdateProjList = New-Object System.Collections.Generic.List[System.Object]

Write-host '--- prepare workspace --------------------------------------------------'
Copy-Item -Path lib -Destination $BUILD_ROOT -Recurse -Force
$CC_PATH = "$env:CC_PATH"
if ($CC_PATH -eq "") {$CC_PATH = "cc.exe"}

Write-host '--- find updated projects ----------------------------------------------'
git fetch origin
$gitdiff = git diff --name-status origin/master

ForEach ($fileStatus in $($gitdiff -split "`r`n")) {
    $fileStatusList = $fileStatus.Split("`t")
    $filepath = ""
    if (($fileStatusList[0] -eq "A") -or ($fileStatusList[0] -eq "M")) 
    { $filepath = $fileStatusList[1] }
    elseif ($fileStatusList[0].Contains("R")) 
    { $filepath = $fileStatusList[2] }

    if ($filepath -eq "") { continue }
    $farray = $filepath.Split("/")
    if (!($farray[0] -like "SRC*")) { continue }

    $projCodeName = $farray[1]
    $projRoot = $farray[0]
    $existProj = $false

    for ($i = 0; $i -lt $toUpdateProjList.count; $i++) {
        if ($toUpdateProjList[$i].CodeName -eq $projCodeName) {
            if ($filepath -like "*CC") {
                $toUpdateProjList[$i].SRCFile = $filepath }
            elseif ($filepath -like "*DLL") {
                $toUpdateProjList[$i].DLLFile = $filepath }
            $existProj = $true
            break
        }
    }
    
    if ($existProj) {continue}
    $newProj = [pscustomobject]$ProjHashtable
    $newProj.Root = $projRoot
    $newProj.CodeName = $projCodeName

    if ($filepath -like "*CC") {
        $newProj.SRCFile = $filepath
        $toUpdateProjList += $newProj }
    elseif ($filepath -like "*DLL") {
        $newProj.DLLFile = $filepath
        $toUpdateProjList += $newProj }
}

Write-host '--- build and prepare artifacts ----------------------------------------'
if (Test-Path .\release) {Remove-Item -path .\release -Recurse}
New-Item release -ItemType "directory"

# Build from VPG or copy DLL dirsctory
foreach ($updatedProj in $toUpdateProjList) {
    $srcDir = $updatedProj.Root + $DIR_SPLIT + $updatedProj.CodeName
    if ($updatedProj.SRCFile -ne "") {
        $buildDir = $BUILD_ROOT + $DIR_SPLIT + "SRC"
        $buildProj = $buildDir + $DIR_SPLIT + $updatedProj.CodeName + ".proj"
        $resultDir = $buildDir + $DIR_SPLIT + $updatedProj.CodeName + $DIR_SPLIT + "WIN32"
        $resultDll = $resultDir + $DIR_SPLIT + $updatedProj.CodeName + ".DLL"
        $resultSrc = $resultDir + $DIR_SPLIT + $updatedProj.CodeName + ".CC"

        Copy-Item -Path $srcDir\* -Destination $buildDir -Recurse -Force
        if (Test-Path $resultDir) { Remove-Item -path $resultDir -Recurse }
        New-Item $resultDir -ItemType "directory"

        & "$CC_PATH" $buildProj
        $timeout = 600
        $interval = 10
        while (!(Test-Path $resultSrc) -and !(Test-Path $resultDll) -and ($timeout -gt 0))  {
            $timeout -= $interval
            Start-Sleep $interval }
        & ./stopProcess.ps1

        if (!(Test-Path $resultSrc) -or !(Test-Path $resultDll)) {
            $result = 9
            continue }
        Copy-Item -Path $resultDir\* -Destination release -Recurse -Force }
    else {
        $depolyFiles = $srcDir + $DIR_SPLIT + $updatedProj.CodeName + $DIR_SPLIT + "WIN32" + $DIR_SPLIT + $updatedProj.CodeName + "*"
        Copy-Item -Path $depolyFiles -Destination release -Recurse -Force }
}

exit $result
```


### ###




### Reference ###

-   [PowerShell 文件 - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-tw/powershell/?view=powershell-7.1)
    -   [關於邏輯運算子 - PowerShell | Microsoft Docs](https://docs.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_logical_operators?view=powershell-7.1)
-   [Compare timestamps for two files](https://social.technet.microsoft.com/Forums/ie/en-US/9806b43c-7573-43f4-a3ee-d855b01b959e/compare-timestamps-for-two-files?forum=winserverpowershell)
-   [Boolean literals in PowerShell - Stack Overflow](https://stackoverflow.com/questions/10581206/boolean-literals-in-powershell)
-   [Array](https://docs.microsoft.com/zh-tw/powershell/scripting/learn/deep-dives/everything-about-arrays?view=powershell-7.1)
    -   [PowerShell Array Guide: How to Use and Create](https://www.varonis.com/blog/powershell-array/)
    -   [function - How do I dynamically add elements to arrays in PowerShell? - Stack Overflow](https://stackoverflow.com/questions/13318382/how-do-i-dynamically-add-elements-to-arrays-in-powershell)
    -   [Removing Objects from Arrays in PowerShell – SAPIEN Blog](https://www.sapien.com/blog/2014/11/18/removing-objects-from-arrays-in-powershell/)
-   [PSCustomObject](https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-pscustomobject?view=powershell-7.1)
    -   [powershell - How to initialize an array of custom objects - Stack Overflow](https://stackoverflow.com/questions/17353797/how-to-initialize-an-array-of-custom-objects/17354800)
-   [How to run an EXE file in PowerShell with parameters with spaces and quotes - Stack Overflow](https://stackoverflow.com/questions/1673967/how-to-run-an-exe-file-in-powershell-with-parameters-with-spaces-and-quotes)
-   [What are Powershell exit codes? | Powershell return code | ManageEngine](https://www.manageengine.com/products/desktop-central/returning-error-code-on-scripts-how-to.html)
