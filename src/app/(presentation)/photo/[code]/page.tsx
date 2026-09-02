import PhotoLightbox from "@/components/domains/photos/PhotoLightbox";
import { dummyPhotoResultList } from "@/lib/dummy-api/lists";
import type { Metadata } from "next";

interface PhotoPageProps {
  params: Promise<{
    code: string;
  }>;
}

function getPhotoByCode(code: string) {
  const photoCode = Number(code);

  if (!Number.isFinite(photoCode)) {
    return null;
  }

  return dummyPhotoResultList(64).find((photo) => photo.code === photoCode) ?? null;
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const { code } = await params;
  const photo = getPhotoByCode(code);

  return {
    title: `${photo?.name ?? `Photo ${code}`} - Patrick McMullan`,
  };
}

export default async function PhotoPage({
  params,
}: PhotoPageProps) {
  const { code } = await params;
  const photo = getPhotoByCode(code);

  if (!photo) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-4">
        <p>Photo not found.</p>
      </main>
    );
  }

  return (
    <main>
      <PhotoLightbox photo={photo} />
    </main>
  );
}
