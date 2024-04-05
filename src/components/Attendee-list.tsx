import { ChangeEvent, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { IconButton } from "./Icon-Button";
import { Table } from "./Table/Table";
import { TableHeader } from "./Table/Table-header";
import { TableCell } from "./Table/Table-cell";
import { TableRow } from "./Table/Table-row";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10);

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="flex-1 bg-transparent outline-none border-0 p-0 text-sm"
            placeholder="Buscar participante..."
            onChange={onSearchInputChange}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
            <TableRow key={attendee.id} className="hover:bg-white/10">
              <TableCell>
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/5"
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length} items
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex items-center gap-1.5">
                  <IconButton
                    onClick={goToFirstPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToPreviousPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    className="bg-white/10 border border-white/10 rounded-md p-1.5"
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
