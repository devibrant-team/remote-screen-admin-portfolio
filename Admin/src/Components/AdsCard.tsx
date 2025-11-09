import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { fetchAds } from "../Redux/Slices/getAdsSlice";
import type { AdsFormData, SelectedAd } from "../Interface/Interfaces";
import { Pencil, Trash2, Loader2 } from "lucide-react"; // 👈 add Loader2
import { openEditAdsModal } from "../Redux/Slices/adsUiSlice";
import { deleteAdApi } from "../Redux/Slices/deleteAd";

const getMediaSrc = (media: AdsFormData["media"]): string | undefined => {
  if (!media) return undefined;
  if (media instanceof File) {
    return URL.createObjectURL(media);
  }
  return media as unknown as string;
};

const AdsCard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 🗑 React Query mutation for delete
  const { mutate: deleteAd } = useMutation({
    mutationFn: (id: number) => deleteAdApi(id),
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this ad?");
    if (!ok) return;
    deleteAd(id); // 👈 use mutation, NOT deleteAdApi directly
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<AdsFormData[], Error>({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-gray-100 p-4 rounded-2xl shadow border border-gray-200"
          >
            <div className="w-full aspect-[4/3] bg-gray-300 rounded-xl mb-4" />
            <div className="h-4 w-2/3 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 text-red-800 border border-red-300 p-4 rounded-xl shadow-md max-w-md mx-auto mt-4">
        <p className="font-semibold">Failed to load ads:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-gray-600 p-8 border border-dashed border-gray-300 rounded-2xl">
        No ads to show yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((ad: any, idx) => {
        const type = ad.media_type?.toLowerCase?.() ?? "";
        const isImage = type === "image" || type === "gif";
        const isVideo = type === "video";
        const src = getMediaSrc(ad.media);

        const handleEdit = () => {
          const payload: SelectedAd = {
            id: ad.id ,
            media: ad.media,
            media_type: ad.media_type,
            description: ad.description,
          };
          dispatch(openEditAdsModal(payload));
        };

        return (
          <div
            key={ad.id ?? idx}
            className="bg-[var(--white,#fff)] p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow transition relative"
          >
            <div className="relative mb-3">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-200">
                {!src ? (
                  <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
                    No media
                  </div>
                ) : isImage ? (
                  <img
                    src={src}
                    alt={ad.description || "Ad"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : isVideo ? (
                  <video
                    src={src}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
                    Unsupported media type: {ad.media_type || "unknown"}
                  </div>
                )}
              </div>

              {ad.media_type && (
                <span className="absolute top-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md capitalize">
                  {ad.media_type}
                </span>
              )}

              <div className="absolute top-2 right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow px-2 py-1"
                >
                  <Pencil className="h-4 w-4 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(ad.id)}
                  disabled={deletingId === ad.id}
                  className="inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow px-2 py-1 disabled:opacity-60"
                >
                  {deletingId === ad.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-600" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-800 line-clamp-3">
              {ad.description || "No description"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdsCard;
