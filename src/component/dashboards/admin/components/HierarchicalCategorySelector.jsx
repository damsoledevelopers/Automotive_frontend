import React, { useState, useEffect } from 'react';
import { categoryService } from '../../../../services/apiService';
import { FaSpinner } from 'react-icons/fa';

const HierarchicalCategorySelector = ({ value, onChange, required = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Parse existing value if provided
    if (value && categories.length > 0) {
      const parts = value.split(' → ');
      if (parts.length === 3) {
        setSelectedParent(parts[0]);
        setSelectedCategory(parts[1]);
        setSelectedSubcategory(parts[2]);
      } else if (parts.length === 2) {
        setSelectedParent(parts[0]);
        setSelectedCategory(parts[1]);
        setSelectedSubcategory('');
      } else {
        // Check if it's a parent, category, or subcategory
        const cat = categories.find(c => c.name === value);
        if (cat) {
          const hasParent = cat.parentCategory && (
            (typeof cat.parentCategory === 'object' && (cat.parentCategory._id || cat.parentCategory.id)) ||
            (typeof cat.parentCategory === 'string' && cat.parentCategory)
          );
          
          if (!hasParent) {
            setSelectedParent(value);
            setSelectedCategory('');
            setSelectedSubcategory('');
          } else {
            // Find parent chain using categoryMap
            const parentId = typeof cat.parentCategory === 'object' 
              ? (cat.parentCategory._id || cat.parentCategory.id)?.toString()
              : cat.parentCategory?.toString();
            const parent = parentId ? categories.find(c => {
              const cId = (c.id || c._id)?.toString();
              return cId === parentId || c.name === parentId;
            }) : null;
            
            if (parent) {
              const hasGrandParent = parent.parentCategory && (
                (typeof parent.parentCategory === 'object' && (parent.parentCategory._id || parent.parentCategory.id)) ||
                (typeof parent.parentCategory === 'string' && parent.parentCategory)
              );
              
              if (!hasGrandParent) {
                setSelectedParent(parent.name);
                setSelectedCategory(value);
                setSelectedSubcategory('');
              } else {
                const grandParentId = typeof parent.parentCategory === 'object' 
                  ? (parent.parentCategory._id || parent.parentCategory.id)?.toString()
                  : parent.parentCategory?.toString();
                const grandParent = grandParentId ? categories.find(c => {
                  const cId = (c.id || c._id)?.toString();
                  return cId === grandParentId || c.name === grandParentId;
                }) : null;
                
                if (grandParent) {
                  setSelectedParent(grandParent.name);
                  setSelectedCategory(parent.name);
                  setSelectedSubcategory(value);
                }
              }
            }
          }
        }
      }
    }
  }, [value, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Use fast flat endpoint - no product counts, just category data
      const result = await categoryService.getAllActiveCategoriesFlat();
      let categoriesData = [];
      
      if (result && result.categories && Array.isArray(result.categories)) {
        categoriesData = result.categories;
      } else if (Array.isArray(result)) {
        categoriesData = result;
      } else if (result && result.data && Array.isArray(result.data.categories)) {
        categoriesData = result.data.categories;
      } else if (result && result.data && Array.isArray(result.data)) {
        categoriesData = result.data;
      }
      
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Build category map for fast lookups
  const categoryMap = new Map();
  categories.forEach(cat => {
    const id = cat.id || cat._id;
    if (id) {
      categoryMap.set(id.toString(), cat);
    }
    categoryMap.set(cat.name, cat);
  });

  // Get parent categories (Level 1) - no parentCategory
  const parentCategories = categories.filter(cat => {
    if (!cat.parentCategory) return true;
    const parentId = typeof cat.parentCategory === 'object' 
      ? (cat.parentCategory._id || cat.parentCategory.id)?.toString()
      : cat.parentCategory?.toString();
    return !parentId;
  });

  // Get categories under selected parent (Level 2)
  const categoriesUnderParent = selectedParent
    ? categories.filter(cat => {
        if (!cat.parentCategory) return false;
        const selectedParentCat = categoryMap.get(selectedParent);
        if (!selectedParentCat) return false;
        
        const parentId = typeof cat.parentCategory === 'object' 
          ? (cat.parentCategory._id || cat.parentCategory.id)?.toString()
          : cat.parentCategory?.toString();
        const selectedParentId = (selectedParentCat.id || selectedParentCat._id)?.toString();
        
        return parentId === selectedParentId;
      })
    : [];

  // Get subcategories under selected category (Level 3)
  const subcategoriesUnderCategory = selectedCategory
    ? categories.filter(cat => {
        if (!cat.parentCategory) return false;
        const selectedCategoryCat = categoryMap.get(selectedCategory);
        if (!selectedCategoryCat) return false;
        
        const parentId = typeof cat.parentCategory === 'object' 
          ? (cat.parentCategory._id || cat.parentCategory.id)?.toString()
          : cat.parentCategory?.toString();
        const selectedCategoryId = (selectedCategoryCat.id || selectedCategoryCat._id)?.toString();
        
        return parentId === selectedCategoryId;
      })
    : [];

  const handleParentChange = (e) => {
    const newParent = e.target.value;
    setSelectedParent(newParent);
    setSelectedCategory('');
    setSelectedSubcategory('');
    if (newParent) {
      onChange(newParent);
    } else {
      onChange('');
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubcategory('');
    if (selectedParent && newCategory) {
      onChange(`${selectedParent} → ${newCategory}`);
    } else if (newCategory) {
      onChange(newCategory);
    } else {
      onChange(selectedParent || '');
    }
  };

  const handleSubcategoryChange = (e) => {
    const newSubcategory = e.target.value;
    setSelectedSubcategory(newSubcategory);
    if (selectedParent && selectedCategory && newSubcategory) {
      onChange(`${selectedParent} → ${selectedCategory} → ${newSubcategory}`);
    } else if (selectedCategory && newSubcategory) {
      onChange(`${selectedCategory} → ${newSubcategory}`);
    } else if (newSubcategory) {
      onChange(newSubcategory);
    } else {
      onChange(selectedParent && selectedCategory ? `${selectedParent} → ${selectedCategory}` : selectedCategory || selectedParent || '');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <FaSpinner className="animate-spin" />
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Parent Category (Level 1) - Optional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent Category <span className="text-gray-400 text-xs">(Optional - Level 1)</span>
        </label>
        <select
          value={selectedParent}
          onChange={handleParentChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
        >
          <option value="">None - Skip to Category</option>
          {parentCategories.map(cat => (
            <option key={cat._id || cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Category (Level 2) - Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-red-500">*</span> <span className="text-gray-400 text-xs">(Level 2)</span>
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          required={required}
          disabled={selectedParent && categoriesUnderParent.length === 0}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select Category</option>
          {selectedParent ? (
            categoriesUnderParent.length > 0 ? (
              categoriesUnderParent.map(cat => (
                <option key={cat._id || cat.id} value={cat.name}>{cat.name}</option>
              ))
            ) : (
              <option disabled>No categories under {selectedParent}</option>
            )
          ) : (
            // If no parent selected, show all categories that have a parent (Level 2 categories)
            categories.filter(cat => {
              const parent = typeof cat.parentCategory === 'object' 
                ? cat.parentCategory 
                : categories.find(c => (c._id || c.id) === cat.parentCategory);
              return parent && !parent.parentCategory;
            }).map(cat => {
              const parent = typeof cat.parentCategory === 'object' 
                ? cat.parentCategory.name 
                : categories.find(c => (c._id || c.id) === cat.parentCategory)?.name;
              return (
                <option key={cat._id || cat.id} value={cat.name}>
                  {parent ? `${parent} → ${cat.name}` : cat.name}
                </option>
              );
            })
          )}
        </select>
      </div>

      {/* Subcategory (Level 3) - Optional */}
      {selectedCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory <span className="text-gray-400 text-xs">(Optional - Level 3)</span>
          </label>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            disabled={subcategoriesUnderCategory.length === 0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">None - Use Category Only</option>
            {subcategoriesUnderCategory.length > 0 ? (
              subcategoriesUnderCategory.map(cat => (
                <option key={cat._id || cat.id} value={cat.name}>{cat.name}</option>
              ))
            ) : (
              <option disabled>No subcategories under {selectedCategory}</option>
            )}
          </select>
        </div>
      )}

      {/* Display Selected Path */}
      {(selectedParent || selectedCategory || selectedSubcategory) && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">Selected Category Path:</p>
          <p className="text-sm font-bold text-blue-900">
            {selectedParent && selectedCategory && selectedSubcategory
              ? `${selectedParent} → ${selectedCategory} → ${selectedSubcategory}`
              : selectedParent && selectedCategory
              ? `${selectedParent} → ${selectedCategory}`
              : selectedCategory
              ? selectedCategory
              : selectedParent}
          </p>
        </div>
      )}
    </div>
  );
};

export default HierarchicalCategorySelector;

