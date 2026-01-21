"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import clsx from 'clsx'; 

const NavLink = forwardRef(({ className, activeClassName, exact, to, href, ...props }, ref) => {
  const pathname = usePathname();
  const path = to || href || "";
  const isActive = exact 
    ? pathname === path 
    : pathname === path || (path !== "/" && pathname?.startsWith(path));

  let finalClassName = className;
  if (typeof className === "function") {
    finalClassName = className({ isActive });
  } else {
    finalClassName = clsx(className, isActive && activeClassName);
  }

  return (
    <Link
      ref={ref}
      href={path}
      className={finalClassName}
      {...props}
    />
  );
});
NavLink.displayName = "NavLink";
export { NavLink };