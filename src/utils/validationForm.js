// src/utils/validation.js
export function verifyName(name) {
    return name.trim() !== '';
  }
  
  export function verifyArq(file) {
    if (!file) {
      return false;
    }
    const validExtensions = ['kml', 'kmz', 'shp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  }
  