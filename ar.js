document.addEventListener('DOMContentLoaded', () => {
  const startCameraBtn = document.getElementById('start-camera');
  const bouquetSelect = document.getElementById('bouquet-select');
  const saveImageBtn = document.getElementById('save-image');
  const bouquetModel = document.getElementById('bouquet-model');

  // Placeholder bouquet models
  const bouquets = {
    bouquet1: 'https://via.placeholder.com/300', // Заменить на .gltf модель
    bouquet2: 'https://via.placeholder.com/300'  // Заменить на .gltf модель
  };

  if (startCameraBtn) {
    startCameraBtn.addEventListener('click', () => {
      const scene = document.querySelector('a-scene');
      if (scene) {
        scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
        saveImageBtn.disabled = false;
      }
    });
  }

  if (bouquetSelect) {
    bouquetSelect.addEventListener('change', () => {
      const selectedBouquet = bouquetSelect.value;
      bouquetModel.setAttribute('gltf-model', bouquets[selectedBouquet]);
    });
  }

  if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
      const scene = document.querySelector('a-scene');
      if (!saveImageBtn.disabled) {
        scene.querySelector('canvas').toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'ar-bouquet.png';
          link.click();
          URL.revokeObjectURL(url);
        });
      }
    });
  }
});