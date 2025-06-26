import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [showInstallation, setShowInstallation] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null }); // type: 'image' | 'video'

  if (!product) return null;

  // 强制只显示指定图片
  const imgSrc = '/images/products/PS11752778-main.jpg';
  const installImgSrc = '/images/products/PS11752778-install-1.gif';
  const partSelectUrl = 'https://www.partselect.com/PS11752778-Whirlpool-WPW10321304-Refrigerator-Door-Bin.htm?SourceCode=3&SearchTerm=PS11752778';
  const youtubeUrl = 'https://youtu.be/zSCNN6KpDE8';

  // 提取YouTube视频ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const videoId = getYouTubeVideoId(youtubeUrl);

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.onerror = null;
    e.target.src = '/images/products/placeholder.png';
  };

  // 打开modal
  const openModal = (type) => setModal({ open: true, type });
  const closeModal = () => setModal({ open: false, type: null });

  // Portal modal
  let modalNode = null;
  if (typeof window !== 'undefined') {
    modalNode = document.getElementById('modal-root');
    if (!modalNode) {
      modalNode = document.createElement('div');
      modalNode.id = 'modal-root';
      document.body.appendChild(modalNode);
    }
  }
  const ModalPortal = modal.open && modalNode
    ? createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-compact modal-center" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {modal.type === 'image' && (
              <img src={imgSrc} alt="Enlarged view" className="modal-image" />
            )}
            {modal.type === 'install-image' && (
              <img src={installImgSrc} alt="Installation Large" className="modal-image" />
            )}
            {modal.type === 'video' && videoId && (
              <div className="modal-video-wrapper">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Installation Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: 8, width: '60vw', height: '34vw', maxWidth: 900, maxHeight: 500, minWidth: 320 }}
                ></iframe>
              </div>
            )}
          </div>
        </div>,
        modalNode
      )
    : null;

  return (
    <>
      <div className="product-card-compact">
        {/* 产品图片 */}
        <div className="product-image-compact">
          <img 
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            onClick={() => openModal('image')}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
          />
          {product.customerRating && (
            <div className="rating-badge">
              ★ {product.customerRating}
            </div>
          )}
        </div>
        
        {/* 产品信息 */}
        <div className="product-info-compact">
          <h3 className="product-name-compact">{product.name}</h3>
          
          <div className="product-meta">
            <div className="part-number">{product.partNumber}</div>
            <div className="price">${product.price}</div>
          </div>
          
          <div className="product-description-compact">
            {product.description}
          </div>
          
          {/* 安装指南 */}
          <div className="installation-compact">
            <button 
              className="install-btn"
              onClick={() => setShowInstallation(!showInstallation)}
            >
              {showInstallation ? 'Hide' : 'Show'} Installation
            </button>
            
            {showInstallation && (
              <div className="install-content">
                <p>{product.installation}</p>
                
                {/* 安装图片 */}
                <div className="install-image">
                  <img 
                    src={installImgSrc}
                    alt="Installation guide"
                    onError={handleImageError}
                    onClick={() => openModal('install-image')}
                    style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
                  />
                  <span className="click-hint">Click to enlarge</span>
                </div>
                
                {/* 安装视频 */}
                <div className="install-video">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a 
                      href={youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="video-link-compact"
                      style={{ marginBottom: 8 }}
                    >
                      📹 Watch Video
                    </a>
                    {videoId && (
                      <div style={{ position: 'relative', width: '100%', maxWidth: 240, cursor: 'pointer' }} onClick={() => openModal('video')}>
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                          alt="Video thumbnail"
                          style={{ width: '100%', borderRadius: 6 }}
                        />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'white', fontSize: 22 }}>▶</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 操作按钮 */}
          <div className="product-actions-compact">
            <a 
              href={partSelectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-view"
            >
              View on PartSelect
            </a>
          </div>
        </div>
      </div>
      {ModalPortal}
    </>
  );
};

export default ProductCard; 