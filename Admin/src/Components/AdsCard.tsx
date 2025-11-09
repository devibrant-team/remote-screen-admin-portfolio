import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

// Adjust import to your slice:
import { fetchAds } from "../Redux/Slices/getAdsSlice";

type MediaType = "image" | "video" | "gif" | string;

export interface Ad {
  id: number;
  media: string;        // full URL or path to the asset
  media_type: MediaType; // e.g., "image", "video", "gif"
  description: string;
}

const AdsGrid: FC = () => {
  const { data, isLoading, isError, error } = useQuery<Ad[]>({
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
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-600 p-8 border border-dashed border-gray-300 rounded-2xl">
        No ads to show yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((ad) => {
        const isImage =
          ad.media_type?.toLowerCase() === "image" ||
          ad.media_type?.toLowerCase() === "gif";

        const isVideo = ad.media_type?.toLowerCase() === "video";

        return (
          <div
            key={ad.id}
            className="bg-[var(--white,#fff)] p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow transition"
          >
            <div className="relative mb-3">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-200">
             
                {isImage ? (
                  <img
                    src={ad.media}
                    alt={ad.description || `Ad #${ad.id}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : isVideo ? (
                  <video
                    src={ad.media}
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
                <span className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md capitalize">
                  {ad.media_type}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-800 line-clamp-3">
              {ad.description || "No description"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdsGrid;
