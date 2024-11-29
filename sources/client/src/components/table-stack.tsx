'use client'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export interface TableStackOptions<T> {
  data: T[]
}

export interface Props<T> extends TableStackOptions<T> {
  isLoding: boolean
}

export function TableStack<T>(props: Props<T>) {
  const { data, isLoding } = props

  const table = useReactTable({
    data: data,
    columns: [],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                {isLoding ? 'Cargando...' : 'No hay resultados'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
