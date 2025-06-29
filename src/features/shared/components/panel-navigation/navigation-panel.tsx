import { AsideCSS } from "@shared/components/nav/nav.style";
import Logout from "@shared/components/logout/logout";
import Nav from "@shared/components/nav/nav";

export default function NavigationPanel() {
  return (
    <aside className={AsideCSS}>
      <Nav />
      <Logout />
    </aside>
  );
}
