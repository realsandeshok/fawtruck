import React, { useState } from 'react';
import { Edit, Save } from 'lucide-react';

interface AboutUsContent {
  title: string;
  description: string;
  imageUrl: string;
}

const AboutUs = () => {
  const [content, setContent] = useState<AboutUsContent>({
    title: 'About Ourtitle: About Our Company',
    description: 'We are a leading truck manufacturer committed to innovation and quality.',
    imageUrl: '/placeholder.svg',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About Us</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Edit className="mr-2" size={20} />
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Save className="mr-2" size={20} />
            Save
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {isEditing ? (
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={content.title}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={content.description}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                rows={4}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={content.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">{content.title}</h2>
            <p className="mb-4">{content.description}</p>
            <img src={content.imageUrl} alt="About Us" className="w-full h-64 object-cover rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;

