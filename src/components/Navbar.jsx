import darkIcon from "../assets/dark.svg";
import lightIcon from "../assets/light.svg";
import notePad from "../assets/pad.png";

import { Link, useNavigate } from "react-router-dom";

import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useTheme from "../hooks/useTheme";
import useSignOut from "../hooks/useSignOut";

import { AuthContext } from "../contexts/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  let { logOut } = useSignOut();

  let navigate = useNavigate();
  let { changeTheme, isDark } = useTheme();
  let logoutUser = async (e) => {
    e.preventDefault();
    await logOut();

    navigate("/login");
  };

  let { user } = useContext(AuthContext);

  console.log("navbar user :", user);

  return (
    <>
      {!!user && (
        <header
          className={`shadow-xl px-3 mb-2 rounded-md flex justify-between space-x-10 items-center ${
            isDark ? "bg-cardbg " : ""
          }`}
        >
          <Link
            to="/"
            className="text-decoration-none flex items-center space-x-3 "
          >
            <img
              src={notePad}
              alt=""
              className="w-[40px] min-w-[30px] min-h-[30px]  h-[40px]"
            />
            <h2 className=" text-primary text-xl hidden lg:block">
              Memory NoteBook
            </h2>
          </Link>
          <div className="flex justify-start space-x-3 items-center">
            {!!user && (
              <>
                <Menu
                  as="div"
                  className="relative border-0 inline-block text-left"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5  px-3 py-2 text-sm border-0 font-semibold text-gray-900 ring-inset ring-gray-300 ">
                      <img
                        src={user.photoURL}
                        className="w-[35px] h-[35px] rounded-full cursor-pointer"
                        alt="Auth Profile"
                      />
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className={`absolute right-0 z-10 mt-2 w-[290px] origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        isDark ? "bg-cardbg" : "bg-white"
                      }`}
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              href="#"
                              className={classNames(
                                active ? "bg-slate-100" : "text-gray-700",
                                "block px-3 py-2 text-sm",
                                isDark && !active ? "text-white" : "text-black"
                              )}
                            >
                              <i className="bi bi-person-circle"></i>{" "}
                              &nbsp;&nbsp;
                              {user.displayName}
                            </p>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <p
                              href="#"
                              onClick={(e) => logoutUser(e)}
                              className={classNames(
                                active ? "bg-slate-100" : "text-gray-700",
                                "block px-3 py-2 text-sm",
                                isDark && !active ? "text-white" : "text-black"
                              )}
                            >
                              <i className="bi bi-box-arrow-right"></i>
                              &nbsp; &nbsp;Logout
                            </p>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            )}

            <div
              className={`flex justify-center space-x-8 p-2  border-zinc-400 rounded-full items-center ${
                isDark ? "border " : "shadow-lg "
              }`}
            >
              {/* <span className="text-2xl">Logout</span> */}

              {!isDark && (
                <img
                  src={darkIcon}
                  alt=""
                  className="w-6 cursor-pointer "
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  onClick={() => changeTheme("dark")}
                />
              )}
              {isDark && (
                <img
                  src={lightIcon}
                  alt=""
                  className="w-7 cursor-pointer "
                  onClick={() => changeTheme("light")}
                />
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}
