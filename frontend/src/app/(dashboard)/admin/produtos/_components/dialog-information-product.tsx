'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProduct from './form-fields-product'
import { productType } from '@/types/product'

interface DialogInformationProductProps {
  product?: productType
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationProduct({
  product,
  children,
}: DialogInformationProductProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do produto</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do produto abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsProduct product={product} readOnly />
      </DialogContent>
    </Dialog>
  )
}
