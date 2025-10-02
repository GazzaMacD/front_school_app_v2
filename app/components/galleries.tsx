import type { TSimpleImageBlock } from "~/common/types";

/*
 * Simple Image Gallery
 */
type TSIGProps = {
  images: TSimpleImageBlock[];
  baseUrl: string;
};

function SimpleImageGallery({ images, baseUrl }: TSIGProps) {
  return (
    <div className="g-basic-container">
      <div className="c-gallery">
        {images.map((fig) => {
          return (
            <figure key={fig.id} className="c-gallery__figure">
              <img
                src={`${baseUrl}${fig.value.image.medium.src}`}
                alt={fig.value.image.medium.src}
              />
              {fig.value.caption && (
                <figcaption>{fig.value.caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export { SimpleImageGallery };
