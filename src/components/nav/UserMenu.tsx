"use client";

import Image from "next/image";
import { Dropdown, Label, Avatar } from "@heroui/react";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar>
          <Avatar.Image
            alt={user.name}
            src={user.image ?? "/globe.svg"}
            height={40}
            width={40}
          />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="edit-profile" textValue="Edit Profile">
            <Label>Edit Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={signOut}
            id="logout"
            textValue="Logout"
            variant="danger"
          >
            <Label>Logout</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
