"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteServer";

  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Удалить сервер
          </DialogTitle>

          <DialogDescription className="text-center">
            Вы уверены, что хотите это сделать? <br />
            <span className="text-indigo-500 font-semibold">
              {server?.name}
            </span>{" "}
            он будет удалён навсегда.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100/90 dark:bg-gray-100/10 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Отмена
            </Button>
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClick}
              variant="destructive"
            >
              Подтвердить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
