'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>로딩중...</p>;
  }

  if (session) {
    return (
      <>
        <p className="text-white">안녕하세요, {session.user?.name}님</p>
        <button onClick={() => signOut()} className="bg-white">
          로그아웃
        </button>
      </>
    );
  }

  return (
    <button onClick={() => signIn()} className="bg-white">
      로그인
    </button>
  );
}
