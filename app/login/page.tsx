'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('로그인 성공');
      Cookies.set('userEmail', email, { path: '/' });
      router.push('/');
    } else {
      setMessage(data.error || '로그인 실패');
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>

        <input
          type="email"
          placeholder="이메일"
          className="border px-3 py-2 rounded mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border px-3 py-2 rounded mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-2">
          <a href="/signup" className="bg-green-600 text-white px-4 py-2 rounded">회원가입</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>로그인</button>
        </div>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}
