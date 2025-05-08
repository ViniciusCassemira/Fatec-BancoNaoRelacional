@echo off
:: Define formato da data
for /f %%i in ('powershell -command "Get-Date -Format yyyy-MM-dd"') do set DATA=%%i

:: Diretório de saída
set BACKUP_DIR=C:\Users\vinic\Desktop\aula12\%DATA%

:: Cria o diretório se ñ existir
mkdir "%BACKUP_DIR%"

:: Comando mongodump para o banco detran
mongodump --db detran --out "%BACKUP_DIR%"