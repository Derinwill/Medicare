import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    status: "active",
    priority: "low",
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="text-black flex w-screen min-h-screen bg-gradient-to-r from-blue-400 to-purple-400 justify-center items-center p-4">
      <div className="bg-white shadow-2xl shadow-purple-400 w-full sm:w-3/4 lg:w-1/2 rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">Add New Record</h2>
        <p className="text-gray-500">Fill in the information below to create a new record entry</p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Record Title */}
            <div>
              <label className="text-gray-600 text-sm">Record Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter record title"
                className="w-full p-2 border rounded-lg border-gray-300 text-black"
              />
            </div>

            {/* Record ID (Read-Only) */}
            <div>
              <label className="text-gray-600 text-sm">Record ID</label>
              <input
                type="text"
                value="REC-2025-001"
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 border-gray-300 text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="text-gray-600 text-sm">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg border-gray-300 text-black"
              >
                <option value="">Select category</option>
                <option value="medical">Medical</option>
                <option value="insurance">Insurance</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-gray-600 text-sm">Status</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="text-gray-600 text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg border-gray-300"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-gray-600 text-sm">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg border-gray-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-600 text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter record description"
              className="w-full p-2 border rounded-lg border-gray-300 h-24"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="text-gray-600 text-sm">Attachments</label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer">
              <span className="block text-lg">📂</span>
              <p>Drag and drop files here or <span className="text-blue-500 cursor-pointer">browse files</span></p>
              <input type="file" multiple className="hidden" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={()=>{navigate("/dashboard")}} className="px-4 py-2 bg-gray-200 rounded-lg text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;