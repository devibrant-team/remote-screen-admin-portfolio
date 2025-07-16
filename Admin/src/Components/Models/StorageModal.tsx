import React, { useState } from "react";
import BaseModal from "./BaseModal";

type StorageModalProps = {
  open: boolean;
  onClose: () => void;
};

const StorageModal: React.FC<StorageModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "GB",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Storage:", form);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Add Extra Storage">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unit Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
          <div className="flex gap-4">
            {["GB", "Screen"].map((unit) => (
              <label key={unit} className="flex items-center gap-2 text-[var(--black)] text-lg">
                <input
                  type="radio"
                  name="unit"
                  value={unit}
                  checked={form.unit === unit}
                  onChange={handleChange}
                  className="accent-[var(--mainred)] w-6 h-6 sm:w-7 sm:h-7"
                />
                {unit}
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
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

        {/* Price */}
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

        <button
          type="submit"
          className="bg-[var(--mainred)] text-white px-4 py-2 rounded-md hover:brightness-90 transition"
        >
          Save
        </button>
      </form>
    </BaseModal>
  );
};

export default StorageModal;
