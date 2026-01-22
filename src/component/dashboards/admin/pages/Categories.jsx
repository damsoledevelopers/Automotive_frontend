import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBox, FaSpinner } from 'react-icons/fa';
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
      const filters = {};
      if (searchTerm) {
        filters.search = searchTerm;
      }
      const result = await categoryService.getAdminCategories(filters);
      const categoriesData = result.categories || result || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to load categories: ' + error.message);
    } finally {
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
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Parent Category</label>
                    <select
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-bold transition appearance-none"
                      value={formData.parentCategory}
                      onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                    >
                      <option value="none">None (Root Category)</option>
                      {categories.filter(cat => !cat.parentCategory || cat.parentCategory === null).map(cat => (
                        <option key={cat._id || cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
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
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                        <FaBox size={24} />
                      </div>
                      <button type="button" className="flex-1 px-5 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl font-bold text-gray-400 hover:border-blue-400 hover:text-blue-500 transition">
                        Upload Icon
                      </button>
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
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
                  <FaBox />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filteredCategories.map((category) => (
          <div key={category._id || category.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-blue-500">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <FaBox size={24} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('edit', category)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition border border-transparent hover:border-green-100"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleAction('delete', category)}
                  disabled={loading}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100 disabled:opacity-50"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 truncate uppercase tracking-tight">{category.name}</h3>
            <div className="flex items-center gap-4 border-t border-gray-50 pt-4 mt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Products</span>
                <span className="text-sm font-bold text-gray-900">{category.products || category.productCount || 0}</span>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Subcategories</span>
                <span className="text-sm font-bold text-gray-900">{category.subcategories || category.subCategoryCount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


