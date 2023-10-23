import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { FC } from 'react'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'

type CategoriesPageProps = {
  params: {
    storeId: string
  }
}

const CategoriesPage: FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formatedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
