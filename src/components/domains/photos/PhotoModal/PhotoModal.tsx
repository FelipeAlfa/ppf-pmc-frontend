"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal/Modal";
import PhotoLightbox from "@/components/domains/photos/PhotoLightbox";
import type { PhotoResult } from "@/types";

interface PhotoModalProps {
  closeHref: string;
  photo: PhotoResult;
}

export default function PhotoModal({
  closeHref,
  photo,
}: PhotoModalProps) {
  const router = useRouter();
  const [active, setActive] = useState(true);
  const closeModal = () => {
    setActive(false);
  };

  return (
    <Modal
      active={active}
      label="Photo detail"
      onClose={closeModal}
      onCloseComplete={() => router.push(closeHref)}>
      <PhotoLightbox
        photo={photo}
        closeControl={<Modal.CloseButton />} />
    </Modal>
  );
}
