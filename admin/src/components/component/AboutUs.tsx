import React, { useState, useEffect } from 'react';
import { Edit, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface AboutUsContent {
  id: number;
  title: string;
  description: string;
  // imageUrl: string;
}

const AboutUs = () => {
  const [content, setContent] = useState<AboutUsContent>({
    id: 1, // Default ID; this should be dynamically set from the fetched data
    title: 'Loading...',
    description: 'Please wait while we fetch the content...',
    // imageUrl: '/placeholder.svg',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      toast.error('Session expired. Please log in again.');
      return;
    }
  
    try {
      // Send the updated content to the backend using PUT request
      const response = await fetch(`http://localhost:3000/api/admin/about/${content.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({
          title: content.title,
          description: content.description,
        }),
      });
  
      if (response.ok) {
        const updatedContent = await response.json();
  
        // Check if updatedContent contains the expected 'about' object
        if (updatedContent && updatedContent.about) {
          setContent(updatedContent.about); // Set the updated content directly
          setIsEditing(false); // Exit editing mode
          alert('Content saved successfully!');
        } else {
          console.error('Unexpected response format:', updatedContent);
          alert('Error saving content');
        }
      } else {
        // Parse and log the error response
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error saving content: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving about data:', error);
      alert('Error saving content');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.error('Token not found. User might need to log in.');
        toast.error('Session expired. Please log in again.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/admin/about', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data && data.about && Array.isArray(data.about) && data.about.length > 0) {
          const latestContent = data.about[0]; // Select the first item in the array
          setContent({
            id: latestContent.id, // Set the ID for the PUT request
            title: latestContent.title,
            description: latestContent.description,
            // imageUrl: latestContent.imageUrl || '/placeholder.svg', /// Set a default image if not provided
          });
        } else {
          console.log('No content available');
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchData();
  }, []); // Runs once on component mount

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
            {/* <div className="mb-4">
              <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={content.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div> */}
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">{content.title}</h2>
            <p className="mb-4">{content.description}</p>
            {/* <img src={content.imageUrl} alt="About Us" className="w-full h-64 object-cover rounded-md" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
