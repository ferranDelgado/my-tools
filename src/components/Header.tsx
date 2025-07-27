import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { to: "/my-tools", label: "Home" },
  { to: "/my-tools/jwt-reader", label: "JWT Reader" },
  // { to: "/my-tools/exif-reader", label: "Exif/Metadata Reader" },
  { label: "Exif/Metadata Reader",
    list: [
    {to: "/my-tools/exif-reader", label: "Image"},
    {to: "/my-tools/exif-reader", label: "Video"}
  ] },
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
                link.list ? (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-popover-foreground border border-border shadow-lg">
                      <ul className="grid w-[300px] gap-4 p-4">
                        {link.list.map((item) => (
                          <li key={item.to}>
                            <NavigationMenuLink asChild active={location.pathname === item.to}>
                              <Link to={item.to}>
                                <div className="font-medium">{item.label}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.to}>
                    <NavigationMenuLink asChild active={location.pathname === link.to}>
                      <Link to={link.to}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header; 