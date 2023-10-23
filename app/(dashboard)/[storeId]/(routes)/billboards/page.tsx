import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { FC } from 'react'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'

type BillboardsPageProps = {
  params: {
    storeId: string
  }
}

const BillboardsPage: FC<BillboardsPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
