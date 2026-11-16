import Link from 'next/link';
import Image from 'next/image';

type LogoProps = {
  href?: string;
  showName?: boolean;
  className?: string;
};

export default function Logo({ href = '/', showName = false, className = '' }: LogoProps) {
  const mark = (
    <Image src="/logo-mark.svg" alt="" width={40} height={40} className="h-10 w-10 shrink-0 shadow-sm" />
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
