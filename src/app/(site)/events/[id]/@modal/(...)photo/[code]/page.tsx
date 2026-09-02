import PhotoModal from "@/components/domains/photos/PhotoModal/PhotoModal";
import { dummyPhotoResultList } from "@/lib/dummy-api/lists";

interface PhotoModalPageProps {
  params: Promise<{
    code: string;
    id: string;
  }>;
}

function getPhotoByCode(code: string) {
  const photoCode = Number(code);

  if (!Number.isFinite(photoCode)) {
    return null;
  }

  return dummyPhotoResultList(64).find((photo) => photo.code === photoCode) ?? null;
}

export default async function PhotoModalPage({
  params,
}: PhotoModalPageProps) {
  const { code, id } = await params;
  const photo = getPhotoByCode(code);

  return (
    photo
      ? <PhotoModal photo={photo} closeHref={`/events/${id}`} />
      : <p>Photo not found.</p>
  );
}
