import Link from 'next/link';

type LogoProps = {
  href?: string;
  showName?: boolean;
  className?: string;
};

export default function Logo({ href = '/', showName = false, className = '' }: LogoProps) {
  const mark = (
    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[11px] font-bold tracking-[-0.08em] text-white shadow-sm">
      JM
    </span>
  );

  const content = (
    <>
      {mark}
      {showName && (
        <span className="leading-none">
          <span className="block text-sm font-semibold tracking-tight text-black">Joshua</span>
          <span className="block text-[11px] text-black/50">Madulid</span>
        </span>
      )}
    </>
  );

  return (
    <Link href={href} aria-label="Joshua Madulid home" className={`inline-flex items-center gap-2 ${className}`}>
      {content}
    </Link>
  );
}
