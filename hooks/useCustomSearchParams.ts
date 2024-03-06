import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function useCustomSearchParams<T extends Partial<{ [key: string]: string | string[] | undefined }>>() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const urlSearchParams = searchParams ? new URLSearchParams(searchParams) : null;

  function setSearchParams(params: Partial<T>) {
    if (!urlSearchParams) return console.error('query parameter 없음!');

    Object.entries(params).forEach(([key, value]) => {
      if (!value.length) urlSearchParams?.delete(key);
      else {
        if (Array.isArray(value)) urlSearchParams?.set(key, String(value.join('|')));
        else urlSearchParams?.set(key, value);
      }
    });

    const paramsToString = urlSearchParams?.toString();
    const query = paramsToString ? `?${paramsToString}` : '';

    router.push(`${pathname}${query}`);
  }

  return { searchParams, setSearchParams };
}

export default useCustomSearchParams;
