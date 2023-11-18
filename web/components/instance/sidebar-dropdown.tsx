import { Fragment } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { LogOut, Settings, Shield, UserCircle2 } from "lucide-react";
// mobx store
import { useMobxStore } from "lib/mobx/store-provider";
// hooks
import useToast from "hooks/use-toast";
// services
import { AuthService } from "services/auth.service";
// ui
import { Avatar } from "@plane/ui";

// Static Data
const profileLinks = (workspaceSlug: string, userId: string) => [
  {
    name: "View profile",
    icon: UserCircle2,
    link: `/${workspaceSlug}/profile/${userId}`,
  },
  {
    name: "Settings",
    icon: Settings,
    link: `/${workspaceSlug}/me/profile`,
  },
];

const authService = new AuthService();

export const InstanceSidebarDropdown = observer(() => {
  const router = useRouter();
  // store
  const {
    theme: { sidebarCollapsed },
    workspace: { workspaceSlug },
    user: { currentUser, currentUserSettings },
  } = useMobxStore();
  // hooks
  const { setToastAlert } = useToast();

  // redirect url for normal mode
  const redirectWorkspaceSlug =
    workspaceSlug ||
    currentUserSettings?.workspace?.last_workspace_slug ||
    currentUserSettings?.workspace?.fallback_workspace_slug ||
    "";

  const handleSignOut = async () => {
    await authService
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch(() =>
        setToastAlert({
          type: "error",
          title: "Error!",
          message: "Failed to sign out. Please try again.",
        })
      );
  };

  return (
    <div className="flex items-center gap-x-3 gap-y-2 px-4 py-4">
      <div className="w-full h-full truncate">
        <div
          className={`flex flex-grow items-center gap-x-2 rounded p-1 truncate ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <div className={`flex-shrink-0 `}>
            <Shield className="h-6 w-6 text-custom-text-100" />
          </div>

          {!sidebarCollapsed && (
            <h4 className="text-custom-text-100 font-medium text-base truncate">Instance Admin Settings</h4>
          )}
        </div>
      </div>

      {!sidebarCollapsed && (
        <Menu as="div" className="relative flex-shrink-0">
          <Menu.Button className="grid place-items-center outline-none">
            <Avatar
              name={currentUser?.display_name}
              src={currentUser?.avatar}
              size={24}
              shape="square"
              className="!text-base"
            />
          </Menu.Button>

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
              className="absolute left-0 z-20 mt-1.5 flex flex-col w-52  origin-top-left rounded-md
          border border-custom-sidebar-border-200 bg-custom-sidebar-background-100 px-1 py-2 divide-y divide-custom-sidebar-border-200 shadow-lg text-xs outline-none"
            >
              <div className="flex flex-col gap-2.5 pb-2">
                <span className="px-2 text-custom-sidebar-text-200">{currentUser?.email}</span>
                {profileLinks(workspaceSlug?.toString() ?? "", currentUser?.id ?? "").map((link, index) => (
                  <Menu.Item key={index} as="button" type="button">
                    <Link href={link.link}>
                      <a className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80">
                        <link.icon className="h-4 w-4 stroke-[1.5]" />
                        {link.name}
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </div>
              <div className="py-2">
                <Menu.Item
                  as="button"
                  type="button"
                  className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 stroke-[1.5]" />
                  Sign out
                </Menu.Item>
              </div>

              <div className="p-2 pb-0">
                <Menu.Item as="button" type="button" className="w-full">
                  <Link href={redirectWorkspaceSlug}>
                    <a className="flex w-full items-center justify-center rounded px-2 py-1 text-sm font-medium text-custom-primary-100 hover:text-custom-primary-200 bg-custom-primary-10 hover:bg-custom-primary-20">
                      Normal Mode
                    </a>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
});