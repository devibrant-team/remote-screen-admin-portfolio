import { X } from "lucide-react";
import React, { useState } from "react";

type ModalType = "plan" | "storage";

type PlanModalProps = {
  open: boolean;
  onClose: () => void;
  type: ModalType;
};

const PlanModal: React.FC<PlanModalProps> = ({ open, onClose, type }) => {
  const [form, setForm] = useState({
    name: "",
    screens: "",
    years: "",
    storage: "",
    price: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {type === "plan" ? "Add New Plan" : "Add Extra Storage"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {type === "plan" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Screens</label>
                <input
                  name="screens"
                  value={form.screens}
                  onChange={handleChange}
                  type="number"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Years</label>
                <input
                  name="years"
                  value={form.years}
                  onChange={handleChange}
                  type="number"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Storage (GB)</label>
                <input
                  name="storage"
                  value={form.storage}
                  onChange={handleChange}
                  type="number"
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
            </>
          )}

          {type === "storage" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-[var(--mainred)] text-white px-4 py-2 rounded-md hover:brightness-90 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
