import Image from "next/image";

/** A screenshot in a window frame, so a UI shot reads as a UI and not as art. */
export function Shot({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  crop,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  /** Fixed frame height in px; the shot is top-anchored and cropped to fit. */
  crop?: number;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-background shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
      </div>
      <div style={crop === undefined ? undefined : { height: crop }} className={crop === undefined ? undefined : "overflow-hidden"}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 900px, 100vw"
          className={crop === undefined ? "block h-auto w-full" : "block h-full w-full object-cover object-top"}
        />
      </div>
    </figure>
  );
}
