import React, { useState, useEffect } from "react";
import { Edit, Save } from "lucide-react";
import toast from "react-hot-toast";
import { AdminAboutContent } from "../../api/api";
import Layout from "./Layout";

interface AboutUsContent {
  id: number;
  title: string;
  description: string;
  title_ar: string;
  description_ar: string;
  // imageUrl: string;
}

const AboutUs = () => {
  const [content, setContent] = useState<AboutUsContent>({
    id: 1, // Default ID; this should be dynamically set from the fetched data
    title: "Loading...",
    description: "Please wait while we fetch the content...",
    title_ar: "Loading...",
    description_ar: "Please wait while we fetch the content...",
    // imageUrl: '/placeholder.svg',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    try {
      // Send the updated content to the backend using PUT request
      const response = await fetch(
        `${AdminAboutContent}/${content.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in headers
          },
          body: JSON.stringify({
            title: content.title,
            description: content.description,
            title_ar: content.title_ar,
            description_ar: content.description_ar,
          }),
        }
      );

      if (response.ok) {
        const updatedContent = await response.json();

        // Check if updatedContent contains the expected 'about' object
        if (updatedContent && updatedContent.about) {
          setContent(updatedContent.about); // Set the updated content directly
          setIsEditing(false); // Exit editing mode
          toast.success("Content saved successfully!");
        } else {
          console.error("Unexpected response format:", updatedContent);
          toast.error("Unexpected response from the server.");
        }
      } else {
        // Parse and log the error response
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error(`Error saving content: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error("An error occurred while saving the content.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem("token"); // Retrieve token from local storage
      // if (!token) {
      //   console.error("Token not found. User might need to log in.");
      //   toast.error("Session expired. Please log in again.");
      //   return;
      // }
      try {
        const response = await fetch(AdminAboutContent
        //    {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
        const data = await response.json();

        if (
          data &&
          data.about &&
          Array.isArray(data.about) &&
          data.about.length > 0
        ) {
          const latestContent = data.about[0]; // Select the first item in the array
          setContent({
            id: latestContent.id, // Set the ID for the PUT request
            title: latestContent.title,
            description: latestContent.description,
            title_ar: latestContent.title_ar,
            description_ar: latestContent.description_ar,
            // imageUrl: latestContent.imageUrl || '/placeholder.svg', /// Set a default image if not provided
          });
        } else {
          toast.error("No content available to display.");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast.error("Failed to load content. Please try again.");
      }
    };

    fetchData();
  }, []); // Runs once on component mount

  return (
    <Layout>
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

      <div className="bg-white p-8 rounded-lg shadow-md">
        {isEditing ? (
          <form>
            {/* English Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                English Content
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title (English)
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={content.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title in English"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description (English)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={content.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter description in English"
                ></textarea>
              </div>
            </div>

            {/* Arabic Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Arabic Content
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="title_ar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title (Arabic)
                </label>
                <input
                  type="text"
                  id="title_ar"
                  name="title_ar"
                  value={content.title_ar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل العنوان باللغة العربية"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description_ar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description (Arabic)
                </label>
                <textarea
                  id="description_ar"
                  name="description_ar"
                  value={content.description_ar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="أدخل الوصف باللغة العربية"
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button  onClick={handleSave} className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/* English Section Display */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                English Content
              </h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {content.title}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {content.description}
              </p>
            </div>

            {/* Arabic Section Display */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Arabic Content
              </h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {content.title_ar}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {content.description_ar}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default AboutUs;
