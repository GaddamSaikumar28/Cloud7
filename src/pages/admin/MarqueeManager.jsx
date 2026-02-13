// import React, { useEffect, useState } from 'react';
// import { marqueeApi } from '../../api/marqueeApi';
// import { Trash2, Upload, Image as ImageIcon, Loader2, RefreshCw } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const MarqueeManager = () => {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Upload State
//   const [uploading, setUploading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [targetRow, setTargetRow] = useState(1); // Default to Top Row
//   const [altText, setAltText] = useState('');

//   // 1. Load Data
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await marqueeApi.getPhotos();
//       setPhotos(data);
//     } catch (err) {
//       console.error("Failed to load marquee photos", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 2. Handle File Selection
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // 3. Handle Upload Process
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     try {
//       setUploading(true);
//       await marqueeApi.addPhoto(selectedFile, targetRow, altText);
      
//       // Reset Form
//       setSelectedFile(null);
//       setAltText('');
//       // Refresh Table
//       await fetchData();
//     } catch (err) {
//       alert("Upload failed: " + err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 4. Handle Delete
//   const handleDelete = async (id, storagePath) => {
//     if (!window.confirm("Are you sure you want to delete this photo?")) return;
    
//     try {
//       // Optimistic UI Update (Remove immediately)
//       setPhotos(prev => prev.filter(p => p.id !== id));
//       await marqueeApi.deletePhoto(id, storagePath);
//     } catch (err) {
//       alert("Delete failed");
//       fetchData(); // Revert on error
//     }
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Marquee Management</h1>
//           <p className="text-gray-500 mt-1">Manage images for the moving photo rows.</p>
//         </div>
//         <button onClick={fetchData} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
//           <RefreshCw size={20} />
//         </button>
//       </div>

//       {/* --- UPLOAD SECTION --- */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <Upload size={20} className="text-blue-600" /> Upload New Photo
//         </h2>
        
//         <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
//           {/* File Input */}
//           <div className="md:col-span-5">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
//             <div className="relative group">
//               <input 
//                 type="file" 
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm text-gray-500
//                   file:mr-4 file:py-2.5 file:px-4
//                   file:rounded-lg file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-blue-50 file:text-blue-700
//                   hover:file:bg-blue-100 cursor-pointer border rounded-lg border-gray-300"
//               />
//             </div>
//           </div>

//           {/* Row Selector */}
//           <div className="md:col-span-3">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Target Row</label>
//             <select 
//               value={targetRow} 
//               onChange={(e) => setTargetRow(e.target.value)}
//               className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5"
//             >
//               <option value="1">Row 1 (Top / Left)</option>
//               <option value="2">Row 2 (Bottom / Right)</option>
//             </select>
//           </div>

//           {/* Alt Text (Optional) */}
//           <div className="md:col-span-2">
//              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
//              <input 
//                 type="text" 
//                 value={altText}
//                 onChange={(e) => setAltText(e.target.value)}
//                 placeholder="Description..."
//                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5"
//              />
//           </div>

//           {/* Submit Button */}
//           <div className="md:col-span-2">
//             <button 
//               type="submit" 
//               disabled={!selectedFile || uploading}
//               className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
//                 ${!selectedFile || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
//             >
//               {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Upload'}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* --- TABLE SECTION --- */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
//           <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Existing Photos</h3>
//         </div>

//         {loading ? (
//           <div className="p-12 flex justify-center text-gray-400">
//             <Loader2 className="animate-spin w-8 h-8" />
//           </div>
//         ) : photos.length === 0 ? (
//           <div className="p-12 text-center text-gray-400 italic">No photos found. Upload one above.</div>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <AnimatePresence>
//                 {photos.map((photo) => (
//                   <motion.tr 
//                     key={photo.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
//                           <img className="h-full w-full object-cover" src={photo.image_url} alt={photo.alt_text} />
//                         </div>
//                         <div className="ml-4">
//                             <div className="text-sm text-gray-900 font-medium truncate max-w-[200px]">{photo.alt_text || "No description"}</div>
//                             <div className="text-xs text-gray-500 truncate max-w-[200px]">{photo.storage_path}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${photo.marquee_row === 1 ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
//                         {photo.marquee_row === 1 ? 'Row 1 (Top)' : 'Row 2 (Bottom)'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(photo.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button 
//                         onClick={() => handleDelete(photo.id, photo.storage_path)}
//                         className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
//                         title="Delete Photo"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarqueeManager;
import React, { useEffect, useState } from 'react';
import { marqueeApi } from '../../api/marqueeApi'; // Ensure path is correct
import { Trash2, Upload, RefreshCw, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MarqueeManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetRow, setTargetRow] = useState(1); // Default to Top Row
  const [altText, setAltText] = useState('');

  // 1. Load Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await marqueeApi.getPhotos();
      setPhotos(data || []);
    } catch (err) {
      console.error("Failed to load marquee photos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 3. Handle Upload Process
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploading(true);
      await marqueeApi.addPhoto(selectedFile, targetRow, altText);
      
      // Reset Form
      setSelectedFile(null);
      setAltText('');
      // Refresh Table
      await fetchData();
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id, storagePath) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    
    try {
      // Optimistic UI Update (Remove immediately)
      setPhotos(prev => prev.filter(p => p.id !== id));
      await marqueeApi.deletePhoto(id, storagePath);
    } catch (err) {
      alert("Delete failed");
      fetchData(); // Revert on error
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Marquee Manager</h1>
          <p className="text-slate-400 mt-1">Manage the scrolling photo loop on the homepage.</p>
        </div>
        <button 
          onClick={fetchData} 
          className="p-2 text-slate-400 hover:text-brand-glow hover:bg-white/5 rounded-lg transition-all"
          title="Refresh Data"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* --- UPLOAD SECTION --- */}
      <div className="bg-dark-800/50 rounded-2xl border border-white/5 p-6 md:p-8 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Upload size={18} className="text-blue-400" />
          </div>
          Upload New Photo
        </h2>
        
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          {/* File Input */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Image File</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2.5 file:px-4
                  file:rounded-lg file:border-0
                  file:text-xs file:font-bold file:uppercase file:tracking-wider
                  file:bg-brand-glow file:text-black
                  hover:file:bg-white cursor-pointer 
                  bg-dark-950 rounded-xl border border-white/10 focus:border-brand-glow focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row Selector */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Row</label>
            <div className="relative">
              <select 
                value={targetRow} 
                onChange={(e) => setTargetRow(e.target.value)}
                className="block w-full rounded-xl bg-dark-950 border border-white/10 text-white py-2.5 px-3 focus:border-brand-glow focus:outline-none appearance-none"
              >
                <option value="1">Top Row (Left)</option>
                <option value="2">Bottom Row (Right)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* Alt Text */}
          <div className="md:col-span-2 space-y-2">
             <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Alt Text</label>
             <input 
                type="text" 
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Description..."
                className="block w-full rounded-xl bg-dark-950 border border-white/10 text-white py-2.5 px-3 focus:border-brand-glow focus:outline-none placeholder:text-slate-600"
             />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button 
              type="submit" 
              disabled={!selectedFile || uploading}
              className={`w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                ${!selectedFile || uploading 
                  ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
                  : 'bg-brand-glow text-black hover:bg-white hover:scale-[1.02] shadow-lg shadow-brand-glow/20'}`}
            >
              {uploading ? <Loader2 className="animate-spin" size={18} /> : 'Upload'}
            </button>
          </div>
        </form>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-dark-800/50 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Existing Gallery</h3>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center text-brand-glow">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : photos.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                <ImageIcon size={32} />
            </div>
            <p className="text-slate-400">No photos found in the marquee.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Preview</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Placement</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {photos.map((photo) => (
                    <motion.tr 
                      key={photo.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 bg-dark-950 rounded-lg overflow-hidden border border-white/10 relative group-hover:border-white/30 transition-colors">
                            <img className="h-full w-full object-cover" src={photo.image_url} alt={photo.alt_text} />
                          </div>
                          <div className="ml-4">
                              <div className="text-sm text-white font-medium truncate max-w-[200px]">{photo.alt_text || "No description"}</div>
                              <div className="text-xs text-slate-500 truncate max-w-[200px] font-mono">{photo.storage_path.split('/').pop()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold uppercase tracking-wider rounded-full border 
                          ${photo.marquee_row === 1 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                          {photo.marquee_row === 1 ? 'Top Row' : 'Bottom Row'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        {new Date(photo.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDelete(photo.id, photo.storage_path)}
                          className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete Photo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarqueeManager;