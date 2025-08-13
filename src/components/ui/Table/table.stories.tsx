import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Tables/table';
import { Checkbox } from '../Checkbox/checkbox';
import { Button } from '../Button/button';
import { Badge } from '../Badge/badge';
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    date: '2023-06-12',
    status: 'completed',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    date: '2023-06-13',
    status: 'processing',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
    date: '2023-06-14',
    status: 'pending',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
    date: '2023-06-15',
    status: 'completed',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
    date: '2023-06-16',
    status: 'completed',
  },
];

type Payment = typeof invoices[0];

export const Basic: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => {
    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'completed':
          return <Badge variant="success">Completed</Badge>;
        case 'processing':
          return <Badge variant="secondary">Processing</Badge>;
        case 'pending':
          return <Badge variant="outline">Pending</Badge>;
        default:
          return <Badge variant="outline">Unknown</Badge>;
      }
    };

    return (
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
    const [selectAll, setSelectAll] = useState(false);

    const toggleRow = (invoiceId: string) => {
      setSelectedRows(prev => ({
        ...prev,
        [invoiceId]: !prev[invoiceId]
      }));
    };

    const toggleSelectAll = () => {
      if (selectAll) {
        setSelectedRows({});
      } else {
        const allSelected = {};
        invoices.forEach(invoice => {
          allSelected[invoice.invoice] = true;
        });
        setSelectedRows(allSelected);
      }
      setSelectAll(!selectAll);
    };

    const selectedCount = Object.values(selectedRows).filter(Boolean).length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Invoices</h3>
          {selectedCount > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedCount} of {invoices.length} row(s) selected
            </div>
          )}
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow 
                  key={invoice.invoice}
                  className={selectedRows[invoice.invoice] ? 'bg-muted/50' : ''}
                >
                  <TableCell>
                    <Checkbox 
                      checked={!!selectedRows[invoice.invoice]}
                      onCheckedChange={() => toggleRow(invoice.invoice)}
                      aria-label={`Select ${invoice.invoice}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {selectedCount > 0 && (
          <div className="flex items-center justify-between p-4 border rounded-md bg-muted/50">
            <div className="text-sm text-muted-foreground">
              {selectedCount} invoice(s) selected
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Mark as Paid
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const Sortable: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = useState<{
      key: keyof Payment;
      direction: 'asc' | 'desc';
    }>({ key: 'date', direction: 'asc' });

    const requestSort = (key: keyof Payment) => {
      let direction: 'asc' | 'desc' = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const sortedInvoices = [...invoices].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    const SortIcon = ({ column }: { column: keyof Payment }) => {
      if (sortConfig.key !== column) {
        return <ArrowUpDown className="ml-2 h-4 w-4" />;
      }
      return sortConfig.direction === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      );
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                onClick={() => requestSort('invoice')}
                className="flex items-center font-medium"
              >
                Invoice
                <SortIcon column="invoice" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => requestSort('status')}
                className="flex items-center font-medium"
              >
                Status
                <SortIcon column="status" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => requestSort('date')}
                className="flex items-center font-medium"
              >
                Date
                <SortIcon column="date" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => requestSort('paymentMethod')}
                className="flex items-center font-medium"
              >
                Method
                <SortIcon column="paymentMethod" />
              </button>
            </TableHead>
            <TableHead className="text-right">
              <button
                onClick={() => requestSort('totalAmount')}
                className="flex items-center justify-end w-full font-medium"
              >
                Amount
                <SortIcon column="totalAmount" />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    
    const paginatedInvoices = invoices.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, invoices.length)}
            </span>{' '}
            of <span className="font-medium">{invoices.length}</span> invoices
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    case 'processing':
      return <Badge variant="secondary">Processing</Badge>;
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
