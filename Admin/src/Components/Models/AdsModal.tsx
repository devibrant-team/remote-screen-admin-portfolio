import React from "react";
import BaseModal from "./BaseModal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useQueryClient } from "@tanstack/react-query";
import { insertAds } from "../../Redux/Slices/addAdsSlice";

// Accept image or video
const mediaFileSchema = z
  .instanceof(File)
  .refine(
    (f) =>
      f &&
      (f.type.startsWith("image/") || f.type.startsWith("video/")),
    "File must be an image or a video"
  )
  .refine((f) => {
    // Size caps: images ≤ 3MB, videos ≤ 80MB (tweak as needed)
    if (f.type.startsWith("image/")) return f.size <= 3 * 1024 * 1024;
    if (f.type.startsWith("video/")) return f.size <= 80 * 1024 * 1024;
    return false;
  }, "Images must be ≤ 3MB and videos ≤ 80MB");

const schema = z.object({
  description: z.string().max(500, "Max 500 characters").optional(),
  media: mediaFileSchema.optional().nullable(),
});

type FormValues = z.infer<typeof schema>;

type PlanModalProps = {
  open: boolean;
  onClose: () => void;
};

const AdsModal: React.FC<PlanModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { loading } = useSelector((state: RootState) => state.plans);

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isVideo, setIsVideo] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: "", media: null },
  });

  const selectedMedia = watch("media");

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setValue("media", file, { shouldValidate: true });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setIsVideo(file.type.startsWith("video/"));
    } else {
      setPreviewUrl(null);
      setIsVideo(false);
    }
  };

  const clearMedia = () => {
    setValue("media", null, { shouldValidate: true });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIsVideo(false);
  };

  React.useEffect(() => {
    if (!open) {
      // cleanup when closing
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setIsVideo(false);
      reset({ description: "", media: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    if (data.description) formData.append("description", data.description);
    if (data.media) {
      formData.append("media", data.media);
      formData.append("description", data.description);
      formData.append("media_type", data.media.type.startsWith("video/") ? "video" : "image");
    }

    const result = await dispatch(insertAds(formData) as any);

    if (insertAds.fulfilled.match(result)) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setIsVideo(false);
      reset({ description: "", media: null });
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      onClose();
    } else {
      console.error("Error submitting:", result.payload);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Add New Plan">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded-md"
            rows={3}
            placeholder="Short description (optional)"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Media (image or video) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Media (Image or Video)
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="w-full border p-2 rounded-md"
          />
          {errors.media && (
            <p className="text-sm text-red-500">
              {errors.media.message as string}
            </p>
          )}

          {/* Preview */}
          {previewUrl && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Preview:</p>
                <button
                  type="button"
                  onClick={clearMedia}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>

              {isVideo ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-h-72 rounded-md border"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="w-full max-h-72 object-contain rounded-md border"
                />
              )}
            </div>
          )}

          {/* Small hint */}
          <p className="text-xs text-gray-500 mt-2">
            Images ≤ 3MB (PNG/JPEG/WEBP/GIF). Videos ≤ 80MB (MP4/WebM/others supported by browser).
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedMedia}
          className="bg-[var(--mainred)] text-white px-4 py-2 rounded-md hover:brightness-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </BaseModal>
  );
};

export default AdsModal;
