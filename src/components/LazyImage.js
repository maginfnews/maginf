import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  placeholder = '/images/placeholder.svg',
  ...props 
}) => {
  // Validar alt text e adicionar fallback
  const finalAlt = alt || 'Imagem MAGINF Tecnologia';
  
  if (!alt || alt.trim() === '') {
    console.warn('⚠️ LazyImage sem alt text:', src);
  }
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    
    if (imgRef.current && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imgRef.current);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );
      
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, imageSrc, placeholder]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={finalAlt}
      className={`transition-opacity duration-300 ${
        imageSrc === placeholder ? 'opacity-50' : 'opacity-100'
      } ${className}`}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
