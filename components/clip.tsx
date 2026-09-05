/**
 * A silent looping screen recording in the same window frame the screenshots
 * use, so a clip and a shot sit together without a visual seam.
 *
 * `poster` is the first frame, so the block has its final size before the video
 * arrives and nothing jumps. Anyone who has asked for less motion gets the
 * poster and no playback.
 */
export function Clip({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
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
      <video
        className="block h-auto w-full motion-reduce:hidden"
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hidden h-auto w-full motion-reduce:block" src={poster} alt={alt} />
    </figure>
  );
}
