import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { to: "/my-tools", label: "Home" },
  { to: "/my-tools/about", label: "About" },
  { to: "/my-tools/contact", label: "Contact" },
];

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-background/80 backdrop-blur border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto flex flex-col items-center py-6">
        <div className="text-2xl font-extrabold tracking-tight mb-3 text-primary">My Tools</div>
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
      </nav>
    </header>
  );
};

export default Header; 