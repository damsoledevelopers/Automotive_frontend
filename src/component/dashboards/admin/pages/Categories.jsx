import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBox, FaSpinner, FaUpload } from 'react-icons/fa';
import { categoryService } from '../../../../services/apiService';

const Categories = () => {
  const [view, setView] = useState('list'); // 'list', 'add', or 'edit'
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    parentCategory: 'none',
    description: '',
    icon: '',
    link: '',
    attributes: []
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Fast initial load using flat endpoint (no product counts)
      const fastResult = await categoryService.getAllActiveCategoriesFlat();
      let fastCategoriesData = [];
      
      if (fastResult && fastResult.categories && Array.isArray(fastResult.categories)) {
        fastCategoriesData = fastResult.categories;
      } else if (Array.isArray(fastResult)) {
        fastCategoriesData = fastResult;
      } else if (fastResult && fastResult.data && Array.isArray(fastResult.data.categories)) {
        fastCategoriesData = fastResult.data.categories;
      } else if (fastResult && fastResult.data && Array.isArray(fastResult.data)) {
        fastCategoriesData = fastResult.data;
      }
      
      // Apply search filter if provided
      let filteredFast = fastCategoriesData;
      if (searchTerm) {
        filteredFast = fastCategoriesData.filter(cat => {
          const name = cat.name || cat;
          return name.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      
      // Set categories immediately for fast display
      setCategories(filteredFast);
      setLoading(false);
      
      // Load full data with counts in background (optional, for product counts)
      // This runs async so UI is responsive
      if (!searchTerm) {
        // Only load counts if not searching (to avoid double loading)
        setTimeout(async () => {
          try {
            const filters = {};
            const result = await categoryService.getAdminCategories(filters);
            const categoriesData = result.categories || result || [];
            // Update with counts, but keep fast data structure
            setCategories(prev => {
              const updated = prev.map(cat => {
                const fullCat = categoriesData.find(fc => 
                  (fc._id || fc.id) === (cat.id || cat._id) || fc.name === (cat.name || cat)
                );
                return fullCat || cat;
              });
              return updated.length > 0 ? updated : categoriesData;
            });
          } catch (error) {
            // Silent fail - we already have the fast data
            console.warn('Failed to load category counts:', error);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to load categories: ' + error.message);
      setLoading(false);
    }
  };

  // Refetch when search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (view === 'list') {
        fetchCategories();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleAction = (type, category) => {
    if (type === 'edit') {
      setFormData({
        name: category.name,
        parentCategory: category.parentCategory?._id ? category.parentCategory.name : (category.parentCategory || 'none'),
        description: category.description || '',
        icon: category.icon || '',
        link: category.link || '',
        attributes: category.attributes || []
      });
      setEditingCategoryId(category._id || category.id);
      setView('edit');
    } else if (type === 'delete') {
      if (window.confirm(`Delete ${category.name}? This will also delete all subcategories.`)) {
        handleDelete(category._id || category.id);
      }
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      setLoading(true);
      await categoryService.deleteCategory(categoryId);
      alert('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const maxSize = 200;
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/png', 0.9);
          resolve(compressedBase64);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const compressedIcon = await compressImage(file);
      setFormData({ ...formData, icon: compressedIcon });
    } catch (error) {
      console.error('Failed to process icon:', error);
      alert('Failed to process icon: ' + error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const categoryData = {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        link: formData.link,
        attributes: formData.attributes
      };

      if (formData.parentCategory && formData.parentCategory !== 'none') {
        categoryData.parentCategory = formData.parentCategory;
      } else {
        categoryData.parentCategory = null;
      }

      if (view === 'edit' && editingCategoryId) {
        await categoryService.updateCategory(editingCategoryId, categoryData);
        alert('Category updated successfully!');
      } else {
        await categoryService.createCategory(categoryData);
        alert('Category created successfully!');
      }

      setView('list');
      setFormData({ name: '', parentCategory: 'none', description: '', icon: '', link: '', attributes: [] });
      setEditingCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Helper to determine category level (1, 2, or 3)
  const getLevel = (cat) => {
    if (!cat.parentCategory) return 1;
    
    // Find parent
    const parentId = typeof cat.parentCategory === 'object' 
      ? (cat.parentCategory._id || cat.parentCategory.id) 
      : cat.parentCategory;
      
    const parent = categories.find(c => (c._id || c.id) == parentId);
    
    if (!parent) return 2; // Fallback
    if (!parent.parentCategory) return 2;
    
    return 3;
  };

  // Helper function to get category hierarchy path
  const getCategoryPath = (category) => {
    if (!category.parentCategory) {
      return { level: 1, path: category.name, label: `${category.name} (Parent Category)` };
    }
    
    const parent = categories.find(c => {
      if (typeof category.parentCategory === 'object') {
        return (c._id || c.id) === (category.parentCategory._id || category.parentCategory.id);
      }
      return (c._id || c.id) === category.parentCategory;
    });
    
    if (parent && !parent.parentCategory) {
      return { 
        level: 2, 
        path: `${parent.name} → ${category.name}`, 
        label: `${parent.name} → ${category.name} (Category)` 
      };
    }
    
    if (parent && parent.parentCategory) {
      const grandParent = categories.find(c => {
        if (typeof parent.parentCategory === 'object') {
          return (c._id || c.id) === (parent.parentCategory._id || parent.parentCategory.id);
        }
        return (c._id || c.id) === parent.parentCategory;
      });
      if (grandParent) {
        return { 
          level: 3, 
          path: `${grandParent.name} → ${parent.name} → ${category.name}`, 
          label: `${grandParent.name} → ${parent.name} → ${category.name} (Subcategory)` 
        };
      }
    }
    
    return { level: 2, path: category.name, label: category.name };
  };

  const filteredCategories = categories.filter(cat =>
    !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === 'add' || view === 'edit') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{view === 'edit' ? 'Edit Category' : 'Create New Category'}</h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{view === 'edit' ? 'Update global hierarchy' : 'Define global product hierarchy'}</p>
          </div>
          <button
            onClick={() => setView('list')}
            className="px-4 py-2 text-gray-600 font-bold hover:text-gray-900 transition flex items-center gap-2"
          >
            ← Back to Categories
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-bold transition"
                      placeholder="e.g. Braking System"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Parent Category
                      <span className="text-[10px] text-gray-400 ml-2">(Select parent to create hierarchy)</span>
                    </label>
                    <select
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-bold transition appearance-none"
                      value={formData.parentCategory}
                      onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                    >
                      <option value="none">None (Create Level 1 - Parent Category)</option>
                      {categories
                        .filter(cat => getLevel(cat) < 3) // Only allow selecting Level 1 or 2 as parent
                        .map(cat => {
                          const level = getLevel(cat);
                          let displayName = cat.name;
                          
                          if (level === 2) {
                             const parentId = typeof cat.parentCategory === 'object' 
                              ? (cat.parentCategory._id || cat.parentCategory.id) 
                              : cat.parentCategory;
                             const parent = categories.find(c => (c._id || c.id) == parentId);
                             if (parent) displayName = `${parent.name} → ${cat.name}`;
                          }

                          return (
                            <option key={cat._id || cat.id} value={cat.name}>
                              {displayName} {level === 1 ? '(Creates Level 2 - Category)' : '(Creates Level 3 - Subcategory)'}
                            </option>
                          );
                        })}
                    </select>
                    <p className="text-[10px] text-gray-500 mt-1">
                      <strong>Guide:</strong> Select "None" to create a main category (e.g. Maintenance). <br/>
                      Select a Level 1 item to create a sub-category (e.g. Braking). <br/>
                      Select a Level 2 item to create a product type (e.g. Brake Pads).
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    rows="4"
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-bold transition resize-none"
                    placeholder="Describe the category scope..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Display Icon</label>
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 overflow-hidden">
                        {formData.icon ? (
                          <img src={formData.icon} alt="Category icon" className="w-full h-full object-cover" />
                        ) : (
                          <FaBox size={24} />
                        )}
                      </div>
                      <label className="flex-1 px-5 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl font-bold text-gray-400 hover:border-blue-400 hover:text-blue-500 transition cursor-pointer flex items-center justify-center gap-2">
                        <FaUpload />
                        <span>Upload Icon</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleIconUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="p-4 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100">
                      <FaBox className="text-blue-500 mt-1" />
                      <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                        Icons should be SVG or high-res PNG with transparent background.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="px-8 py-4 font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && <FaSpinner className="animate-spin" />}
                  {view === 'edit' ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Preview Card</h3>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 border-t-4 border-t-blue-500">
                <div className="w-12 h-12 bg-blue-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20 overflow-hidden">
                  {formData.icon ? (
                    <img src={formData.icon} alt="Category icon" className="w-full h-full object-cover" />
                  ) : (
                    <FaBox />
                  )}
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-1">{formData.name || 'Category Name'}</h4>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">
                  Parent: {formData.parentCategory === 'none' ? 'Root' : formData.parentCategory}
                </p>
                <div className="space-y-2 border-t border-gray-50 pt-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>Products</span>
                    <span className="text-gray-900">0</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>Subcategories</span>
                    <span className="text-gray-900">0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <FaBox className="absolute -right-8 -bottom-8 text-9xl opacity-10 rotate-12" />
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 relative z-10">Pro Tip</h3>
              <p className="text-sm font-medium leading-relaxed opacity-90 relative z-10">
                Keep category names short and industry-standard to improve search accuracy for both customers and mechanics.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Category Hierarchy</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Organize global product data</p>
        </div>
        <button
          onClick={() => setView('add')}
          className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition active:scale-95 flex items-center gap-2"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Global Categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 font-bold transition"
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-blue-600 text-3xl" />
        </div>
      )}

      {!loading && filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-semibold">No categories found</p>
        </div>
      )}

      {!loading && filteredCategories.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => {
                  const pathInfo = getCategoryPath(category);
                  return (
                    <tr key={category._id || category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-600 rounded-lg overflow-hidden shrink-0">
                          {category.icon ? (
                            <img src={category.icon} alt={category.name} className="w-full h-full object-cover" />
                          ) : (
                            <FaBox size={20} />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{category.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={pathInfo.path}>
                        {pathInfo.path}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${
                          pathInfo.level === 1 ? 'bg-blue-100 text-blue-700' :
                          pathInfo.level === 2 ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {pathInfo.level === 1 ? 'Parent' : pathInfo.level === 2 ? 'Category' : 'Subcategory'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {category.products ?? category.productCount ?? 0}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {category.subcategories ?? category.subCategoryCount ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAction('edit', category)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleAction('delete', category)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;


