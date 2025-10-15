import { NavLink } from 'react-router';
import { NAV_LINKS } from '@constants';

type NavLinksProps = {
  listClassName?: string;
  onItemClick?: () => void;
};

export function NavLinks({ listClassName, onItemClick }: NavLinksProps) {
  const baseLink =
    'relative inline-flex items-center gap-2 px-2 py-1 text-base sm:text-lg tracking-wide text-gray-300 transition-colors duration-200 hover:text-white cursor-pointer group';

  return (
    <ul className={listClassName}>
      {NAV_LINKS.map(({ to, label, end }) => (
        <li key={to}>
          <NavLink to={to} end={end} className={baseLink} onClick={onItemClick}>
            {label}
            <span className='absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full' />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
