// src/utils/validation.js
export function verifyName(name) {
    return name.trim() !== '';
  }
  
  export function verifyArq(files) {
    if (!files || files.length === 0) {
      return false;
    }

    console.log(files)
    
    const validExtensions = ['kml', 'kmz', 'shp', 'cpg', 'dbf', 'prj', 'qix', 'xml'];
    return files.every(file => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  });
  }
  