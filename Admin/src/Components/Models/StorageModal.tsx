import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { updateCustomPlan } from "../../Redux/Slices/EditSlices/EditCustomPlanSlice";
import { useQueryClient } from "@tanstack/react-query";

type StorageModalProps = {
  open: boolean;
  onClose: () => void;
  id: number;
};

const StorageModal: React.FC<StorageModalProps> = ({ open, onClose, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    price: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(updateCustomPlan({ id, price: parseFloat(form.price) })).unwrap();
      console.log("Updated storage successfully");
      queryClient.invalidateQueries({ queryKey: ["custom"] });
      onClose();
    } catch (err) {
      console.error("Failed to update storage:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Add Extra Storage">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="w-full border p-2 rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="bg-[var(--mainred)] text-white px-4 py-2 rounded-md hover:brightness-90 transition flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </BaseModal>
  );
};

export default StorageModal;
