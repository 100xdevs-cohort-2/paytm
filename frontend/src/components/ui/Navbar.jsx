import React, { useEffect, useRef, useState } from "react";
import { useLogin } from "../../store/hooks/useLogin";

function Navbar({ navOptions, selectedOption, handleSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useLogin();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white-800 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="block size-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="hidden size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  src="/images/paytm-logo.svg"
                  alt="Paytm Logo"
                  className="h-4 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navOptions.map((nav) => (
                    <a
                      // href="#"
                      key={nav.name}
                      aria-current="page"
                      className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium  ${
                        selectedOption === nav.name
                          ? "bg-blue-900 text-white hover:bg-gray-800"
                          : "text-black hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectedOption(nav.name)}
                    >
                      {nav.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="relative ml-3" ref={dropdownRef}>
                <div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    id="user-menu-button"
                    type="button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 cursor-pointer"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logoutImg.svg"
                      alt=""
                      className="size-8 rounded-full"
                    />
                  </button>
                </div>
                {isOpen && (
                  <div
                    role="menu"
                    tabindex="-1"
                    aria-labelledby="user-menu-button"
                    aria-orientation="vertical"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                  >
                    <a
                      id="user-menu-item-0"
                      role="menuitem"
                      tabindex="-1"
                      className="cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700"
                    >
                      Your Profile
                    </a>
                    <a
                      id="user-menu-item-2"
                      role="menuitem"
                      // href="#"
                      tabindex="-1"
                      onClick={logout}
                      className="cursor-pointer hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700"
                    >
                      Log out
                    </a>
                  </div>
                )}
              </div>
              <a
                aria-current="page"
                className={`cursor-pointer rounded-md m-2 px-3 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-red-400`}
                onClick={logout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>

        <div id="mobile-menu" className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">

            {navOptions.map((nav) => (
              <a
                key={nav.name}
                aria-current="page"
                className={`cursor-pointer block rounded-md px-3 py-2 text-base font-medium  ${
                  selectedOption === nav.name
                    ? "bg-blue-900 text-white hover:bg-gray-800"
                    : "text-black hover:bg-gray-200"
                }`}
                onClick={() => handleSelectedOption(nav.name)}
              >
                {nav.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
