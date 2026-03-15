"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Coins, LayoutDashboard, Wallet, Zap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/skills", label: "Skill Bank", icon: Brain },
    { href: "/dashboard/wallet", label: "Skill Wallet", icon: Wallet },
    { href: "/dashboard/credits", label: "Credits", icon: Coins },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-primary">VidyaMitra</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  pathname === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-full">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Coins className="h-3.5 w-3.5 text-yellow-500" />
              <span>450 Credits</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Zap className="h-3.5 w-3.5 text-blue-500" />
              <span>12 AI Tokens</span>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full border">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
