import { UserMenu } from "./UserMenu";
import Notification from "./Notification";

export default function TopSidebar () {
  return (
    <div
    className="w-full px-7 py-3 lg:py-5 bg-white shadow-md"
    >
      <div
      className="w-full h-auto flex justify-center items-center gap-5"
      >
        <Notification />
        <UserMenu />
      </div>
    </div>
  )
}