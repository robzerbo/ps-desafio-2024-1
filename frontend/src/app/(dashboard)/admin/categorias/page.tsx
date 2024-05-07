import { Button } from '@/components/button'
import {
  DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuLayers, LuPlusCircle } from 'react-icons/lu'
import { DialogCreateCategory } from './_components/dialog-create-category'
import ListCategories from './_components/list-categories'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuLayers />
          Categorias
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua categorias.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <DashboardContainer className="flex justify-end">
          <DialogCreateCategory>
            <Button>
              <LuPlusCircle />
              Nova categoria
            </Button>
          </DialogCreateCategory>
        </DashboardContainer>
        <ListCategories />
      </DashboardMain>
    </>
  )
}
