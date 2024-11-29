import { TableStack } from '@/components/table-stack'

export default function Products() {
  return (
    <main>
      <div className="px-4">
        <TableStack data={[]} isLoding={false} />
      </div>
    </main>
  )
}
