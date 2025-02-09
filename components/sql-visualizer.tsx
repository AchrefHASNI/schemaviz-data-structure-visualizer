"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Table as TableIcon, Key, Link as LinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Column {
  name: string;
  type: string;
  isPrimary: boolean;
}

interface Relation {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
}

interface Table {
  name: string;
  columns: Column[];
}

export function SqlVisualizer() {
  const [tables, setTables] = useState<Table[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [newTable, setNewTable] = useState<Table>({ name: "", columns: [] });
  const [newColumn, setNewColumn] = useState<Column>({ name: "", type: "", isPrimary: false });
  const [showRelationDialog, setShowRelationDialog] = useState(false);
  const [newRelation, setNewRelation] = useState<Relation>({
    fromTable: "",
    fromColumn: "",
    toTable: "",
    toColumn: "",
  });

  const addTable = () => {
    if (newTable.name && newTable.columns.length > 0) {
      setTables([...tables, { ...newTable }]);
      setNewTable({ name: "", columns: [] });
    }
  };

  const addColumn = () => {
    if (newColumn.name && newColumn.type) {
      setNewTable({
        ...newTable,
        columns: [...newTable.columns, { ...newColumn }],
      });
      setNewColumn({ name: "", type: "", isPrimary: false });
    }
  };

  const addRelation = () => {
    if (newRelation.fromTable && newRelation.fromColumn && newRelation.toTable && newRelation.toColumn) {
      setRelations([...relations, { ...newRelation }]);
      setShowRelationDialog(false);
      setNewRelation({
        fromTable: "",
        fromColumn: "",
        toTable: "",
        toColumn: "",
      });
    }
  };

  const TableNode: React.FC<{ table: Table }> = ({ table }) => (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <TableIcon className="w-4 h-4 neon-icon" />
        <h3 className="font-semibold">{table.name}</h3>
      </div>
      <div className="space-y-2">
        {table.columns.map((column, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {column.isPrimary && <Key className="w-3 h-3 text-primary" />}
            <span>{column.name}</span>
            <span className="text-muted-foreground">({column.type})</span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        {relations
          .filter((rel) => rel.fromTable === table.name || rel.toTable === table.name)
          .map((rel, index) => (
            <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
              <LinkIcon className="w-3 h-3 neon-icon" />
              {rel.fromTable === table.name ? (
                <span>{rel.fromColumn} → {rel.toTable}.{rel.toColumn}</span>
              ) : (
                <span>{rel.fromTable}.{rel.fromColumn} → {rel.toColumn}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <Dialog open={showRelationDialog} onOpenChange={setShowRelationDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LinkIcon className="w-4 h-4 mr-2 neon-icon" />
              Add Relation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Relation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>From Table</Label>
                <Select
                  value={newRelation.fromTable}
                  onValueChange={(value) => setNewRelation({ ...newRelation, fromTable: value, fromColumn: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map((table) => (
                      <SelectItem key={table.name} value={table.name}>
                        {table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newRelation.fromTable && (
                <div className="space-y-2">
                  <Label>From Column</Label>
                  <Select
                    value={newRelation.fromColumn}
                    onValueChange={(value) => setNewRelation({ ...newRelation, fromColumn: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {tables
                        .find((t) => t.name === newRelation.fromTable)
                        ?.columns.map((col) => (
                          <SelectItem key={col.name} value={col.name}>
                            {col.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>To Table</Label>
                <Select
                  value={newRelation.toTable}
                  onValueChange={(value) => setNewRelation({ ...newRelation, toTable: value, toColumn: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map((table) => (
                      <SelectItem key={table.name} value={table.name}>
                        {table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newRelation.toTable && (
                <div className="space-y-2">
                  <Label>To Column</Label>
                  <Select
                    value={newRelation.toColumn}
                    onValueChange={(value) => setNewRelation({ ...newRelation, toColumn: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column" />
                    </SelectTrigger>
                    <SelectContent>
                      {tables
                        .find((t) => t.name === newRelation.toTable)
                        ?.columns.map((col) => (
                          <SelectItem key={col.name} value={col.name}>
                            {col.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                onClick={addRelation}
                className="w-full"
                disabled={!newRelation.fromTable || !newRelation.fromColumn || !newRelation.toTable || !newRelation.toColumn}
              >
                Add Relation
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2 neon-icon" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Table</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Table Name</Label>
                <Input
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  placeholder="Enter table name"
                />
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Column name"
                    value={newColumn.name}
                    onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
                  />
                  <Input
                    placeholder="Data type"
                    value={newColumn.type}
                    onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setNewColumn({ ...newColumn, isPrimary: !newColumn.isPrimary })}
                  >
                    <Key className={`w-4 h-4 ${newColumn.isPrimary ? "text-primary" : "text-muted-foreground"}`} />
                  </Button>
                </div>
                <Button onClick={addColumn} variant="outline" className="w-full">
                  Add Column
                </Button>
              </div>

              {newTable.columns.length > 0 && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Columns</h4>
                  {newTable.columns.map((col, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {col.isPrimary && <Key className="w-3 h-3 text-primary" />}
                      <span>{col.name}</span>
                      <span className="text-muted-foreground">({col.type})</span>
                    </div>
                  ))}
                </Card>
              )}

              <Button onClick={addTable} className="w-full" disabled={!newTable.name || newTable.columns.length === 0}>
                Create Table
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[500px] border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table, index) => (
            <TableNode key={index} table={table} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}