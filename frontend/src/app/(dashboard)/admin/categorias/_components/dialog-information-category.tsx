'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { categoryType } from '@/types/category'

interface DialogInformationCategoryProps {
  category?: categoryType
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCategory({
  category,
  children,
}: DialogInformationCategoryProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsCategory category={category} readOnly />
      </DialogContent>
    </Dialog>
  )
}
