// __tests__/DataTable.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "../data-table";
import "@testing-library/jest-dom";

// Mock data for testing
const mockData = [
  {
    id: 1,
    title: "Bug 1",
    status: "open",
    severity: "high",
    assignedTo: "developer1",
  },
  {
    id: 2,
    title: "Bug 2",
    status: "in-progress",
    severity: "medium",
    assignedTo: "developer2",
  },
];

const mockColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "severity",
    header: "Severity",
  },
];

describe("DataTable", () => {
  it("renders the table with data", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);

    // Check if table headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();

    // Check if data rows are rendered
    expect(screen.getByText("Bug 1")).toBeInTheDocument();
    expect(screen.getByText("Bug 2")).toBeInTheDocument();
  });

  it("filters data based on search input", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);

    const searchInput = screen.getByPlaceholderText("Search bugs...");
    fireEvent.change(searchInput, { target: { value: "Bug 1" } });

    expect(screen.getByText("Bug 1")).toBeInTheDocument();
    expect(screen.queryByText("Bug 2")).not.toBeInTheDocument();
  });

  it("filters data based on status filter", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);

    const statusFilter = screen.getByText("All Statuses");
    fireEvent.click(statusFilter);

    const openOption = screen.getByText("Open");
    fireEvent.click(openOption);

    expect(screen.getByText("Bug 1")).toBeInTheDocument();
    expect(screen.queryByText("Bug 2")).not.toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", () => {
    const mockOnRowClick = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        onRowClick={mockOnRowClick}
      />
    );

    const firstRow = screen.getByText("Bug 1").closest("tr");
    if (firstRow) {
      fireEvent.click(firstRow);
    }

    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("shows pagination controls", () => {
    // Create a larger dataset to test pagination
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Bug ${i + 1}`,
      status: i % 2 === 0 ? "open" : "in-progress",
      severity: "medium",
    }));

    render(<DataTable columns={mockColumns} data={largeData} />);

    // expect(screen.getByText("Showing 10 of 20 bugs")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
