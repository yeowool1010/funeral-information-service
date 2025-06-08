'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/app/components/ThemeToggle';
import Cookies from 'js-cookie';

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = Cookies.get('userEmail');
    setIsLoggedIn(!!email);
  }, []);

  const handleLogout = () => {
    Cookies.remove('userEmail');
    window.location.reload(); // 또는 router.refresh()
  };

  const navItems = [
    { label: '사람장례시설정보', href: '/' },
    { label: '사람화장시설정보', href: '/person-cremation' },
    { label: '동물장례정보', href: '/animal-funeral' },
  ];

  if (isLoggedIn) {
    // navItems.push({ label: '마이페이지', href: '/me' });
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow mb-6">
      <ThemeToggle />
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          장례 정보 서비스
        </h1>
        <nav className="flex gap-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname === href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/login"
            className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
