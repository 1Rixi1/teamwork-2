"use client";

import axios from "axios";
import qs from "query-string";
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

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteMessage";

  const { apiUrl, query } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.delete(url);

      onClose();
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
            Удалить сообщение
          </DialogTitle>

          <DialogDescription className="text-center">
            Вы уверены, что хотите сделать это ? <br />
            Сообщение будет удалено безвозвратно.
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
