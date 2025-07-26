import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { to: "/my-tools", label: "Home" },
  { to: "/my-tools/jwt-reader", label: "JWT Reader" },
  { to: "/my-tools/exif-reader", label: "Exif Reader" },
  { to: "/my-tools/uuid-generator", label: "UUID Generator" },
];

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-background/80 backdrop-blur border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto flex flex-row items-center justify-between py-6">
        <div className="text-2xl font-extrabold tracking-tight text-primary flex-shrink-0">My Tools</div>
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink asChild active={location.pathname === link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header; 