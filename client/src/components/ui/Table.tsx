import React from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
}

export function Table<T>({ columns, data, keyExtractor }: Props<T>) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '12px 16px', fontWeight: 600 }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', fontSize: '0.9rem' }}>
                {columns.map((col, idx) => (
                  <td key={idx} style={{ padding: '14px 16px' }}>{col.accessor(item)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
