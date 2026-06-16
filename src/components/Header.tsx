import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-950">
          Apple Catalog
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-500">
          <Link href="/" className="transition hover:text-neutral-950">目录</Link>
          <Link href="/admin" className="transition hover:text-neutral-950">后台管理</Link>
        </nav>
      </div>
    </header>
  );
}
