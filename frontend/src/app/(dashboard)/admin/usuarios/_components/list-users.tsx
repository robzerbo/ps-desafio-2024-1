import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Pagination } from '@/components/dashboard/pagination'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { paginationResponseType } from '@/types/pagination-response'
import { userType } from '@/types/user'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuTrash } from 'react-icons/lu'
import { DialogUpdateUser } from './dialog-update-user'
import { DialogUserDelete } from './dialog-delete-user'
import { DialogInformationUser } from './dialog-information-user'

interface ListUsersProps {
  page?: number
}

export default async function ListUsers({ page }: ListUsersProps) {
  let response: paginationResponseType<userType>
  let users: userType[]

  try {
    response = await api.get('/users', {
      params: {
        page,
      },
    })
    users = response?.data
  } catch (e) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: userType) => (
              <TableRow key={user.id}>
                <TableCell>
                  <TabbleCellImage src={user.image} alt="" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex justify-end">
                  <DialogInformationUser user={user}>
                    <Button variant="ghost" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationUser>
                  <DialogUpdateUser user={user}>
                    <Button variant="ghost" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateUser>
                  <DialogUserDelete id={user.id}>
                    <Button variant="ghost" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogUserDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardContainer>
      <DashboardContainer className="flex justify-end">
        <Pagination lastPage={response.last_page} />
      </DashboardContainer>
    </>
  )
}
