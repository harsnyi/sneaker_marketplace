import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const mapping = {
  home: {label: 'Kezdőlap', isLink: true},
  search: {label: 'Keresés', isLink: true},
  release: {label: 'Újdonság', isLink: true},
  profile: {label: 'Profil', isLink: false},
  favorites: {label: 'Kedvencek', isLink: true},
  messages: {label: 'Üzenetek', isLink: true},
  notifications: {label: 'Értesítések', isLink: true},
  sell: { label: 'Eladás', isLink: true },
  settings: {label: 'Beállítások', isLink: true}
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/" className="link">
        Kezdőlap
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const {label, isLink} = mapping[value] || {label: value, isLink: true};
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            {' / '}
            {isLink ? (
              <Link to={to} className={isLast ? 'link last-crumb' : 'link'}>
                {label}
              </Link>
            ) : (
              label
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
