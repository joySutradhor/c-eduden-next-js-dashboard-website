"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Briefcase,
  LogOut,
  Plus,
  Trash2,
  X,
  DollarSign,
  Pencil,
  Building2,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

// ====== API CONFIG ======
const API_BASE = "https://api.eduden.io/api/job-opening";
const LOGIN_API = "https://api.eduden.io/api/login/";

// ====== Confirm Dialog ======
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
}) => {
  if (!isOpen) return null;

  const buttonColor =
    type === "danger" ? "bg-red-500 hover:bg-red-600" : "bg-[#FFD300]";
  const iconColor = type === "danger" ? "text-red-500" : "text-yellow-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#111] rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className={`w-6 h-6 ${iconColor}`} />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-black transition cursor-pointer ${buttonColor}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ====== Job Form ======
const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    address: "",
    job_type: "Full Time",
    salary: "",
    deadline: "",
    job_link: "",
    ...job,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 px-4">
      <div className="relative bg-[#111] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-white hover:text-red-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold text-white mb-5">
          {job ? "Edit Job" : "Create New Job"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white mb-2 block">Job Title *</label>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-2 block">
              Company Name *
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-2 block">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-2 block">Job Type *</label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-[#111] text-white"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white mb-2 block">Salary *</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-white mb-2 block">Deadline *</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-white mb-2 block">Job Link *</label>
            <input
              type="url"
              name="job_link"
              value={formData.job_link}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/10 rounded-md bg-transparent outline-none text-white/80 text-sm"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-[#FFD300] text-black px-4 py-2 rounded-lg font-semibold cursor-pointer"
            >
              {job ? "Update Job" : "Create Job"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ====== Job Card ======
const JobCard = ({ job, onEdit, onDelete }) => (
  <div className="bg-[#111] rounded-xl p-5 hover:shadow-lg transition group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1 text-white/80">
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> {job.job_title}
        </h3>
        <p className="flex items-center gap-2 text-sm mb-1">
          <Building2 className="w-4 h-4" /> At {job.company_name}
        </p>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(job)}
          className="p-2 hover:bg-[#FFD300] hover:text-black rounded-lg text-white cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(job)}
          className="p-2 hover:bg-[#FFD300] text-red-400 rounded-lg cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-white/60">
      <div>
        <p className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4" /> {job.address}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />{" "}
          {new Date(job.deadline).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-2 sm:mt-0 text-right">
        <p className="flex items-center gap-2 justify-end mb-1">
          <Clock className="w-4 h-4" /> {job.job_type}
        </p>
        <p className="flex items-center gap-2 justify-end">
          <DollarSign className="w-4 h-4" /> {job.salary}
        </p>
      </div>
    </div>

    <a
      href={job.job_link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-10 inline-block text-white/55 group-hover:text-white text-sm  font-semibold underline-offset-4 hover:underline"
    >
      View Job →
    </a>
  </div>
);

// ====== Header ======
const Header = ({ onLogout }) => (
  <header className="sticky top-0 z-40 bg-[#010101]/80 backdrop-blur-md border-b border-white/10">
    <div className="container mx-auto px-4 py-4 mt-5 flex justify-between items-center ">
      <Image
        src={logo}
        height={100}
        width={100}
        alt="logo"
        className="w-28 sm:w-32 h-auto"
      />
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
      >
        <LogOut className="w-5 h-5 text-red-500" /> Logout
      </button>
    </div>
  </header>
);

// ====== Main App ======
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    data: null,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ===== Login =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("eduDenToken", data.token);
        setIsAuthenticated(true);
        fetchJobs();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("eduDenToken");
    setIsAuthenticated(false);
  };

  // ===== Fetch Jobs =====
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("eduDenToken")}`,
        },
      });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // ===== Check Auth on Mount =====
  useEffect(() => {
    const token = localStorage.getItem("eduDenToken");
    if (token) {
      setIsAuthenticated(true);
      fetchJobs();
    }
    setIsCheckingAuth(false);
  }, []);

  // ===== CRUD Handlers =====
  const handleCreateJob = (formData) => {
    setConfirmDialog({
      isOpen: true,
      type: "create",
      data: formData,
      title: "Confirm Creation",
      message: "Create this new job?",
    });
  };

  // New update handler
  const handleUpdateJob = (formData) => {
    setConfirmDialog({
      isOpen: true,
      type: "update",
      data: formData,
      title: "Confirm Update",
      message: "Update this job?",
    });
  };

  const confirmCreate = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("eduDenToken")}`,
        },
        body: JSON.stringify(confirmDialog.data),
      });
      fetchJobs();
      setShowForm(false);
    } catch {
      setError("Failed to create job");
    } finally {
      setLoading(false);
      setConfirmDialog({ isOpen: false });
    }
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/${confirmDialog.data.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("eduDenToken")}`,
        },
        body: JSON.stringify(confirmDialog.data),
      });
      fetchJobs();
      setShowForm(false); 
      setEditingJob(null); 
    } catch {
      setError("Failed to update job");
    } finally {
      setLoading(false);
      setConfirmDialog({ isOpen: false });
    }
  };

  const handleDeleteJob = (job) => {
    setConfirmDialog({
      isOpen: true,
      type: "delete",
      data: job,
      title: "Confirm Delete",
      message: `Delete "${job.job_title}"?`,
    });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/${confirmDialog.data.id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("eduDenToken")}`,
        },
      });
      fetchJobs();
    } catch {
      setError("Failed to delete job");
    } finally {
      setLoading(false);
      setConfirmDialog({ isOpen: false });
    }
  };

  const handleConfirm = () => {
    if (confirmDialog.type === "create") confirmCreate();
    if (confirmDialog.type === "delete") confirmDelete();
    if (confirmDialog.type === "update") confirmUpdate();
  };

  // ===== Prevent Flash =====
  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#010101] text-white">
        <div className="w-10 h-10 border-4 border-[#FFD300] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ===== Render Login =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010101] text-white">
        <form
          onSubmit={handleLogin}
          className="bg-[#111] p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#FFD300]">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-500/20 text-red-400 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-white mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-[#222] text-white border border-white/10"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#222] text-white border border-white/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD300] text-black font-semibold py-2 cursor-pointer rounded hover:bg-yellow-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // ===== Authenticated App =====
  return (
    <div className="min-h-screen bg-[#010101] text-white flex flex-col">
      <Header onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 grow overflow-hidden">
        {/* Left Column */}
        <div className="lg:w-1/3 shrink-0">
          {!showForm && !editingJob && (
            <div
              onClick={() => setShowForm(true)}
              className="w-full h-[25vh] sm:h-[30px] xl:h-[35vh] bg-[#111] flex items-center justify-center gap-2 rounded-xl text-white border border-transparent hover:border-[#FFD300] transition cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add New Job
            </div>
          )}

          {(showForm || editingJob) && (
            <JobForm
              job={editingJob}
              onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
              onCancel={() => {
                setShowForm(false);
                setEditingJob(null);
              }}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="grow overflow-y-auto no-scrollbar h-[80vh]">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={(job) => {
                    setEditingJob(job);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="text-center text-gray-400 mt-12">
              No jobs available. Click "Add New Job" to create one.
            </div>
          )}
        </div>
      </main>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false })}
        onConfirm={handleConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type === "delete" ? "danger" : "warning"}
      />
    </div>
  );
}
