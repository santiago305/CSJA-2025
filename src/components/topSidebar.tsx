import { UserMenu } from "./UserMenu";
import Notification from "./Notification";

export default function TopSidebar () {
  return (
    <div
    className="sticky top-0 w-full px-7 py-1 lg:py-3 bg-white shadow-md"
    >
      <div
      className="w-full h-auto flex justify-end items-center gap-5"
      >
        <Notification />
        <UserMenu />
      </div>
    </div>
  )
}