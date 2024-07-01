"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export interface DrawerElementProps {
  text: string;
  target: string;
  selected: boolean;
}

export default function DrawerElement({
  text,
  target,
  selected,
}: DrawerElementProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    if (selected) return;
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("selectedTab", target);

    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick} selected={selected}>
        <ListItemIcon>
          <LibraryMusicIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
