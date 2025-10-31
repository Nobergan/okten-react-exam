import { NavLink, useLocation } from 'react-router';
import type { FC } from 'react';

import { NAV_LINKS } from '@constants';

type NavLinksProps = {
  listClassName?: string;
  onItemClick?: () => void;
};

export const NavLinks: FC<NavLinksProps> = ({ listClassName, onItemClick }) => {
  const { pathname } = useLocation();
  const checkActiveRoute = (to: string) => {
    if (to === '/movies') {
      return pathname.startsWith('/movies') || pathname.startsWith('/movie');
    }
    if (to === '/tv') {
      return pathname.startsWith('/tv');
    }
    if (to === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(to);
  };

  const baseLink =
    'relative inline-flex items-center gap-2 px-2 py-1 text-base sm:text-lg tracking-wide text-gray-300 transition-colors duration-200 hover:text-white cursor-pointer group';

  return (
    <ul className={listClassName}>
      {NAV_LINKS.map(({ to, label, end }) => {
        const isActive = checkActiveRoute(to);

        return (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onItemClick}
              className={`${baseLink} ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
