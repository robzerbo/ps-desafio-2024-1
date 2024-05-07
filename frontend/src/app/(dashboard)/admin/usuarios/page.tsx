import { Button } from '@/components/button'
import {
  DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuPlusCircle, LuUsers } from 'react-icons/lu'
import ListUsers from './_components/list-users'
import { DialogCreateUser } from './_components/dialog-create-user'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page = '1' } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuUsers />
          Usuários
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua usuários.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <DashboardContainer className="flex justify-end">
          <DialogCreateUser>
            <Button>
              <LuPlusCircle />
              Novo usuário
            </Button>
          </DialogCreateUser>
        </DashboardContainer>
        <ListUsers page={Number(page)} />
      </DashboardMain>
    </>
  )
}
