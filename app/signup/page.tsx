'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const router = useRouter();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  const handleEmailCheck = async () => {
    setEmailCheckMessage('');
    if (!isValidEmail(email)) {
      setEmailCheckMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const res = await fetch('/api/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      setEmailCheckMessage('사용 가능한 이메일입니다.');
    } else {
      setEmailCheckMessage(data.error || '이미 존재하는 이메일입니다.');
    }
  };

  const handleSignUp = async () => {
    setMessage('');

    if (!isValidEmail(email)) {
      setMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (!isValidPassword(password)) {
      setMessage('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('회원가입이 완료되었습니다. 아이디의 메일로 이동하여 인증 후 로그인이 가능합니다.');
      router.push('/login');
    } else {
      setMessage(data.error || '회원가입 실패');
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">회원가입</h1>

        <div className="flex gap-2 mb-2">
          <input
            type="email"
            placeholder="이메일"
            className="border px-3 py-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            onClick={handleEmailCheck}
            className="bg-gray-600 text-white px-3 rounded"
          >
            중복확인
          </button>
        </div>
        {emailCheckMessage && <p className="text-sm text-gray-700 mb-2">{emailCheckMessage}</p>}

        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          className="border px-3 py-2 rounded mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="border px-3 py-2 rounded mb-4 w-full"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          onClick={handleSignUp}
        >
          회원가입
        </button>

        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}
