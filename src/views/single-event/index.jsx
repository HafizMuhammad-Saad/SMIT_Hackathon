import { useState, useEffect } from 'react';
import { supabase } from '../../service/supabase';
import { useAuth } from '../../contexts/AuthContext';

const EventCreateForm = () => {
  // Form state with initial values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'Pending', // Default status
    category: '',
    image_url: ''
  });

  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

   useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setImageFile(file);
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };



const styles = {
  fileUploadWrapper: {
    marginBottom: '16px',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '2px dashed #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#999',
      backgroundColor: '#f0f0f0'
    }
  },
  uploadPlaceholder: {
    textAlign: 'center',
    color: '#666',
    padding: '10px'
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '4px'
  }
};

  // Predefined options for status and category
  // const statusOptions = [
  //   { value: 'approved', label: 'Approved' },
  //   { value: 'rejected', label: 'Rejected' },
  //   { value: 'pending', label: 'Pending' },
  //   // { value: 'cancelled', label: 'Cancelled' }
  // ];

  const categoryOptions = [
    { value: 'concert', label: 'Concert' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.description.length < 20) {
      setError('Description should be at least 20 characters');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    // if (!formData.image_url.trim()) {
    //   setError('Image URL is required');
    //   return false;
    // }
    // if (!formData.image_url.match(/^https?:\/\/.+\/.+$/)) {
    //   setError('Please enter a valid image URL');
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.location) {
        throw new Error('Title, description, and location are required');
      }

      let imageUrl = formData.image_url;

      // Upload new image if one was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Insert event data
      const { error } = await supabase.from('events_table').insert({
        ...formData,
        image_url: imageUrl,
        created_at: new Date().toISOString()
      });

      if (error) throw error;

      // Reset form on success
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        location: '',
        status: 'upcoming',
        category: '',
        image_url: ''
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError(err.message || 'An error occurred while creating the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '90%', margin: '0px 20px', padding: '0 16px' }}>
      <form onSubmit={handleSubmit} style={{ 
        background: '#fff', 
        padding: '24px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '24px', textAlign: 'center' }}>Create New Event</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Event title"
            value={formData.title}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Description*</label>
          <textarea
            id="description"
            name="description"
            placeholder="Detailed description of the event"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="location" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Location*</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Event location"
            value={formData.location}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>



        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Category*</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              fontSize: '16px',
              background: 'white'
            }}
          >
            <option value="">Select a category</option>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

     <div style={{ marginBottom: '16px' }}>
        <label htmlFor="image_url" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Image*</label>
        <div style={styles.fileUploadWrapper}>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload" style={styles.uploadLabel}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "200px", 
                  borderRadius: "8px",
                  objectFit: 'contain'
                }}
              />
            ) : (
              <div style={styles.uploadPlaceholder}>
                {formData.image_url ? (
                  <>
                    <img 
                      src={formData.image_url} 
                      alt="Current" 
                      style={{ 
                        maxWidth: "100%", 
                        maxHeight: "150px", 
                        borderRadius: "8px",
                        marginBottom: '10px'
                      }} 
                    />
                    <span>Click to upload a different image</span>
                  </>
                ) : (
                  <span>Click or drag image here to upload</span>
                )}
              </div>
            )}
          </label>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>

        {error && (
          <div style={{ 
            color: '#d32f2f', 
            marginBottom: '16px', 
            padding: '8px 12px', 
            background: '#fde8e8', 
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: '#2e7d32', 
            marginBottom: '16px', 
            padding: '8px 12px', 
            background: '#edf7ed', 
            borderRadius: '4px'
          }}>
            Event created successfully!
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: isSubmitting ? '#9e9e9e' : '#1976d2', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventCreateForm;