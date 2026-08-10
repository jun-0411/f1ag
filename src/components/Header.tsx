import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="sticky top-0 z-[100] h-16 w-full border-[#293241] border-b bg-[#0b0d12] text-[#f5f7fa] md:border-[#242b38]">
      <div
        className="hidden h-full w-full items-center pr-[max(24px,calc((100vw-1272px)/2))] pl-6 md:flex"
        data-node-id="76:2"
        data-name="Utility Header · Logo + Global Search"
      >
        <Link
          aria-label="F1ag 홈"
          className="flex h-11 w-[150px] min-w-0 items-center text-inherit no-underline focus-visible:outline-2 focus-visible:outline-[#4ca7ff] focus-visible:outline-offset-2 focus-visible:outline-solid"
          to="/"
        >
          <span
            className="flex min-w-0 flex-col items-start justify-center whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="text-xl leading-[27px] font-bold text-[#f5f7fa]">
              F1ag
            </span>
            <span className="text-[9px] leading-[13px] font-normal text-[#929baa]">
              F1 DATA
            </span>
          </span>
        </Link>

        <Button
          aria-label="그랑프리·서킷 검색 열기"
          className="ml-auto h-10 w-[300px] justify-start gap-0 rounded-[10px] border-[#242b38] bg-[#151b25] py-0 pr-3.5 pl-[13px] text-left text-[#929baa] shadow-none transition-[border-color,background-color] duration-150 ease-[ease] hover:border-[#303a49] hover:bg-[#1b222e] hover:text-[#929baa] focus-visible:border-[#242b38] focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-[#4ca7ff] focus-visible:outline-offset-2 focus-visible:outline-solid active:translate-y-0 motion-reduce:transition-none"
          type="button"
          variant="outline"
        >
          <Search className="size-[18px]" aria-hidden="true" strokeWidth={2} />
          <span className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] leading-[19px] font-normal">
            그랑프리·서킷 검색
          </span>
          <kbd
            className="ml-auto grid h-6 w-7 shrink-0 place-items-center rounded-md bg-[#202632] text-[11px] leading-none font-bold text-[#929baa] [font-family:inherit]"
            aria-hidden="true"
          >
            /
          </kbd>
        </Button>
      </div>

      <div
        className="grid h-full w-full grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-x-1 py-0 pr-2 pl-1 md:hidden"
        data-node-id="78:4"
        data-name="Mobile Header"
      >
        <Button
          aria-label="메뉴 열기"
          className="size-11 rounded-lg border-0 bg-transparent p-0 text-[#f5f7fa] shadow-none transition-[background-color] duration-150 ease-[ease] hover:bg-[#151b25] hover:text-[#f5f7fa] focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-[#4ca7ff] focus-visible:outline-offset-2 focus-visible:outline-solid active:translate-y-0 motion-reduce:transition-none"
          size="icon"
          type="button"
          variant="ghost"
        >
          <Menu className="size-[18px]" aria-hidden="true" strokeWidth={2} />
        </Button>

        <Link
          aria-label="F1ag 홈"
          className="flex h-11 w-fit max-w-full min-w-0 items-center text-inherit no-underline focus-visible:outline-2 focus-visible:outline-[#4ca7ff] focus-visible:outline-offset-2 focus-visible:outline-solid"
          to="/"
        >
          <span
            className="flex min-w-0 flex-col items-start justify-center whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="text-[17px] leading-[21px] font-bold text-[#f5f7fa]">
              F1ag
            </span>
            <span className="text-[7px] leading-2.5 font-normal text-[#8e99aa]">
              F1 DATA
            </span>
          </span>
        </Link>

        <Button
          aria-label="그랑프리·서킷 검색 열기"
          className="size-11 rounded-lg border-0 bg-transparent p-0 text-[#f5f7fa] shadow-none transition-[background-color] duration-150 ease-[ease] hover:bg-[#151b25] hover:text-[#f5f7fa] focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-[#4ca7ff] focus-visible:outline-offset-2 focus-visible:outline-solid active:translate-y-0 motion-reduce:transition-none"
          size="icon"
          type="button"
          variant="ghost"
        >
          <Search className="size-5" aria-hidden="true" strokeWidth={2} />
        </Button>
      </div>
    </header>
  );
}
