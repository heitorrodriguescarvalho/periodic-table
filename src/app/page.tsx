import Table from '@/components/table'
import TableLabel from '@/components/table-label'

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start space-y-12 overflow-x-auto py-8 xl:flex-row">
      <div className="w-full max-w-full overflow-x-auto p-8">
        <Table />
      </div>
      <TableLabel />
    </div>
  )
}
