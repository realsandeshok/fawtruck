// api.tsx

const BASE_URL = "https://fawtruck.onrender.com";

// Define API endpoints for admin
const AdminLogin = `${BASE_URL}/api/admin/login`;
const AdminBanners = `${BASE_URL}/api/banner`;
const AdminUploadBanners = `${BASE_URL}/api/upload-banner`;
const AdminTruckModels = `${BASE_URL}/api/trucks`;
const AdminAboutContent = `${BASE_URL}/api/about`;
const Enquiries = `${BASE_URL}/api/enquiries`;

export { AdminBanners, AdminTruckModels, AdminAboutContent ,Enquiries, AdminUploadBanners, AdminLogin};
