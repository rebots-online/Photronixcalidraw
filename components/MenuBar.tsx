/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';

interface MenuBarProps {
  onUpload: (file: File) => void;
  onAbout: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onUpload, onAbout }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
      // Reset the input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  // Stub functions for future implementation
  const handleSave = () => alert("Save functionality not implemented yet.");
  const handleExport = () => alert("Export functionality not implemented yet.");
  const handleUndo = () => alert("Undo/Redo is handled by the canvas toolbar.");
  const handleZoomIn = () => alert("Zoom is handled by the canvas tools and mouse wheel.");
  
  return (
    <div className="w-full bg-gray-800 text-sm text-gray-300 px-4 flex items-center border-b border-gray-700 h-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* File Menu */}
        <div className="relative group">
          <button className="hover:bg-gray-700 px-2 rounded-sm">File</button>
          <div className="absolute left-0 mt-1 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg hidden group-hover:block z-50">
            <button onClick={handleUploadClick} className="w-full text-left px-4 py-2 hover:bg-blue-600">Open Image...</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button onClick={handleSave} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Save</button>
            <button onClick={handleExport} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Export</button>
          </div>
        </div>
        {/* Edit Menu */}
        <div className="relative group">
          <button className="hover:bg-gray-700 px-2 rounded-sm">Edit</button>
           <div className="absolute left-0 mt-1 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg hidden group-hover:block z-50">
            <button onClick={handleUndo} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Undo</button>
            <button onClick={handleUndo} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Redo</button>
          </div>
        </div>
        {/* View Menu */}
         <div className="relative group">
          <button className="hover:bg-gray-700 px-2 rounded-sm">View</button>
          <div className="absolute left-0 mt-1 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg hidden group-hover:block z-50">
            <button onClick={handleZoomIn} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Zoom In</button>
            <button onClick={handleZoomIn} className="w-full text-left px-4 py-2 hover:bg-blue-600 opacity-50 cursor-not-allowed">Zoom Out</button>
          </div>
        </div>
        {/* Help Menu */}
        <div className="relative group">
          <button className="hover:bg-gray-700 px-2 rounded-sm">Help</button>
          <div className="absolute left-0 mt-1 w-48 bg-gray-700 border border-gray-600 rounded-md shadow-lg hidden group-hover:block z-50">
            <button onClick={onAbout} className="w-full text-left px-4 py-2 hover:bg-blue-600">About Photronic</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;