import React from "react";
import BaseModal from "./BaseModal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { insertPlan } from "../../Redux/Slices/addPlanSlice";
import { useQueryClient } from "@tanstack/react-query";
type PlanModalProps = {
  open: boolean;
  onClose: () => void;
};

// 1. Define Zod schema
const planSchema = z.object({
  name: z.string().nonempty("Name is required"),
  screen_number: z.number().min(1, "Screens must be at least 1"),
  plan_time: z.number().min(1, "Years must be at least 1"),
  storage: z.number().min(1, "Storage must be at least 1"),
  price: z.number().min(1, "Price must be at least 1"),
  is_recommended: z.boolean().optional(),
});
type PlanFormValues = z.infer<typeof planSchema>;

const PlanModal: React.FC<PlanModalProps> = ({ open, onClose }) => {
  const [successMessage, setSuccessMessage] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.plans
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      screen_number: 1,
      plan_time: 1,
      storage: 1,
      price: 1,
      is_recommended: false,
    },
  });

  const onSubmit = async (data: PlanFormValues) => {
    const result = await dispatch(insertPlan({ ...data, offer: 0 }));

    if (insertPlan.fulfilled.match(result)) {
      reset();
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      onClose();
    } else {
      console.error("Error submitting plan:", result.payload);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Add New Plan">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Screens */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Screens
          </label>
          <input
            type="number"
            {...register("screen_number", { valueAsNumber: true })}
            className="w-full border p-2 rounded-md"
            min={1}
          />
          {errors.screen_number && (
            <p className="text-sm text-red-500">
              {errors.screen_number.message}
            </p>
          )}
        </div>

        {/* Years */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years
          </label>
          <input
            type="number"
            {...register("plan_time", { valueAsNumber: true })}
            className="w-full border p-2 rounded-md"
            min={1}
          />
          {errors.plan_time && (
            <p className="text-sm text-red-500">{errors.plan_time.message}</p>
          )}
        </div>

        {/* Storage */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Storage (GB)
          </label>
          <input
            type="number"
            {...register("storage", { valueAsNumber: true })}
            className="w-full border p-2 rounded-md"
            min={1}
          />
          {errors.storage && (
            <p className="text-sm text-red-500">{errors.storage.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full border p-2 rounded-md"
            min={1}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Is Popular */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("is_recommended")}
            className="accent-[var(--mainred)] w-5 h-5"
          />
          <label className="text-sm font-medium text-gray-700">
            Mark as Popular
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--mainred)] text-white px-4 py-2 rounded-md hover:brightness-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
          {successMessage}
        </div>
      )}
    </BaseModal>
  );
};

export default PlanModal;
