import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useRequireAuth(redirectUrl = '/login') {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.replace(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  return status;
}
