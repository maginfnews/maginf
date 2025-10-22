# Script para criar ZIP do site MAGINF
Write-Host "Criando arquivo ZIP para deploy manual..." -ForegroundColor Green

# Verificar se pasta build existe
if (Test-Path "build") {
    Write-Host "Pasta build encontrada" -ForegroundColor Green
    
    # Remover ZIP anterior se existir
    if (Test-Path "maginf-site-oficial.zip") {
        Remove-Item "maginf-site-oficial.zip" -Force
        Write-Host "ZIP anterior removido" -ForegroundColor Yellow
    }
    
    # Criar novo ZIP
    Compress-Archive -Path "build\*" -DestinationPath "maginf-site-oficial.zip" -CompressionLevel Optimal
    
    Write-Host "ZIP criado: maginf-site-oficial.zip" -ForegroundColor Green
    
    # Mostrar tamanho do arquivo
    $zipSize = (Get-Item "maginf-site-oficial.zip").Length / 1MB
    Write-Host "Tamanho: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "PROXIMOS PASSOS:" -ForegroundColor Magenta
    Write-Host "1. Acesse: https://hpanel.hostinger.com" -ForegroundColor White
    Write-Host "2. Va em: Arquivos > Gerenciador de Arquivos" -ForegroundColor White
    Write-Host "3. Navegue para: /public_html/" -ForegroundColor White
    Write-Host "4. Faca backup do WordPress (se necessario)" -ForegroundColor White
    Write-Host "5. Delete todos os arquivos atuais" -ForegroundColor White
    Write-Host "6. Upload do arquivo: maginf-site-oficial.zip" -ForegroundColor White
    Write-Host "7. Extrair o arquivo ZIP" -ForegroundColor White
    Write-Host "8. Acessar: https://maginf.com.br" -ForegroundColor White
    
} else {
    Write-Host "Pasta build nao encontrada! Execute npm run build primeiro." -ForegroundColor Red
}
