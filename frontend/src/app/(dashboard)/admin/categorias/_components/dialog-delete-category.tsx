'use client'

import { destroyCategory } from '@/actions/category'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateCategoryProps {
  id: string
  children: React.ReactNode
}

export function DialogCategoryDelete({
  id,
  children,
}: DialogCreateCategoryProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    try {
      await destroyCategory(id)
      toast({
        title: 'Produto deletado com sucesso!',
      })
    } catch (e) {
      toast({
        title: 'Não foi possível excluir o produto!',
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de produto</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este produto? Esta ação é
            irreversível e removerá permanentemente o produto do sistema. Deseja
            continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
