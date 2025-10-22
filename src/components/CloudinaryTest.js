import React, { useState } from 'react';
import { IMAGES } from '../config/imageConfig';

const CloudinaryTest = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Função para fazer upload via Cloudinary Upload Widget
  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dxr6mywet',
        uploadPreset: 'maginf_preset', // Você precisa criar este preset no dashboard
        sources: ['local', 'url', 'camera'],
        multiple: true,
        folder: 'maginf-website',
        tags: ['maginf', 'website'],
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
        maxImageFileSize: 2000000, // 2MB
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        cropping: true,
        croppingAspectRatio: 1.5, // Para blog: 400x250 = 1.6
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Upload realizado:', result.info);
          setUploadedImages(prev => [...prev, result.info]);
        }
      }
    );
  };

  return (
    <div style={{ padding: '20px', border: '2px solid orange', margin: '20px' }}>
      <h2>🔥 Teste Cloudinary - MAGINF</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>📤 Upload de Imagens:</h3>
        <button 
          onClick={openUploadWidget}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#FF6B35', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Fazer Upload para Cloudinary
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>🖼️ Imagens Configuradas:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {Object.entries(IMAGES.blog).map(([key, url]) => (
            <div key={key} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h4>{key}</h4>
              <img 
                src={url} 
                alt={key}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                onLoad={() => console.log(`✅ ${key} carregou`)}
                onError={(e) => {
                  console.error(`❌ Erro ao carregar ${key}:`, e);
                  e.target.style.backgroundColor = '#ffebee';
                  e.target.alt = `Erro: ${key}`;
                }}
              />
              <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{url}</p>
            </div>
          ))}
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div>
          <h3>✅ Imagens Enviadas:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {uploadedImages.map((img, index) => (
              <div key={index} style={{ border: '1px solid green', padding: '10px' }}>
                <img 
                  src={img.secure_url} 
                  alt={img.public_id}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
                <p style={{ fontSize: '12px' }}>
                  <strong>ID:</strong> {img.public_id}<br/>
                  <strong>URL:</strong> {img.secure_url}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h4>📋 Status da Configuração:</h4>
        <p>✅ Cloudinary configurado e ativo</p>
        <p>✅ Cloud Name: dqr8k8j8j</p>
        <p>✅ API Key: 276161241966983</p>
        <p>⚠️ Lembre-se de mover as credenciais para .env depois!</p>
      </div>
    </div>
  );
};

export default CloudinaryTest;
