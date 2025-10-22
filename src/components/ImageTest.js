import React from 'react';

const ImageTest = () => {
  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
      <h2>Teste de Imagens</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Imagem de Teste (Nova):</h3>
        <img 
          src="/images/test.svg" 
          alt="Teste MAGINF" 
          style={{ border: '1px solid blue', maxWidth: '200px' }}
          onLoad={() => console.log('Imagem TEST carregou!')}
          onError={(e) => console.error('Erro ao carregar TEST:', e)}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Placeholder Original:</h3>
        <img 
          src="/images/placeholder.svg" 
          alt="Placeholder absoluto" 
          style={{ border: '1px solid red', maxWidth: '200px' }}
          onLoad={() => console.log('Placeholder carregou!')}
          onError={(e) => console.error('Erro ao carregar placeholder:', e)}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Importação direta:</h3>
        <img 
          src={process.env.PUBLIC_URL + '/images/placeholder.svg'} 
          alt="Placeholder com PUBLIC_URL" 
          style={{ border: '1px solid green', maxWidth: '200px' }}
          onLoad={() => console.log('Imagem PUBLIC_URL carregou!')}
          onError={(e) => console.error('Erro PUBLIC_URL:', e)}
        />
      </div>
      
      <div>
        <h3>Debug Info:</h3>
        <p>PUBLIC_URL: {process.env.PUBLIC_URL || 'undefined'}</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
};

export default ImageTest;
