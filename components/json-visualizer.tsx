"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Code, FileJson, ChevronRight, ChevronDown } from "lucide-react";
import { IconCheck, IconCopy } from "@tabler/icons-react";


interface TreeNodeProps {
  data: any;
  path: string[];
  onSelect: (path: string[]) => void;
  selectedPath: string[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ data, path, onSelect, selectedPath }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isSelected = JSON.stringify(path) === JSON.stringify(selectedPath);
  const isObject = typeof data === "object" && data !== null;
  const displayName = path[path.length - 1] || "root";
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isObject) {
      setIsExpanded(!isExpanded);
    }
    onSelect(path);
  };

  const getValuePreview = (value: any) => {
    if (value === null) return "null";
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  };

  return (
    <div className="ml-4">
      <div
        className={`flex items-center py-1 cursor-pointer hover:bg-accent rounded px-2 -ml-2 ${
          isSelected ? "bg-accent" : ""
        }`}
        onClick={handleClick}
      >
        {isObject && (
          <span className="mr-1">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        <span className="text-muted-foreground">{displayName}</span>
        {!isObject && (
          <>
            <span className="mx-2">:</span>
            <span className={`${typeof data === "string" ? "text-green-500" : "text-blue-500"}`}>
              {getValuePreview(data)}
            </span>
          </>
        )}
        {isObject && (
          <span className="text-muted-foreground ml-2">
            {Array.isArray(data) ? "[" : "{"}
            {!isExpanded && (
              <>
                ...
                {Array.isArray(data) ? "]" : "}"}
              </>
            )}
          </span>
        )}
      </div>
      
      {isObject && isExpanded && (
        <div className="border-l-2 border-muted">
          {Object.entries(data).map(([key, value]) => (
            <TreeNode
              key={key}
              data={value}
              path={[...path, key]}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
          <div className="ml-4 text-muted-foreground">
            {Array.isArray(data) ? "]" : "}"}
          </div>
        </div>
      )}
    </div>
  );
};

export function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const formatJson = () => {
    try {
      const formattedInput = jsonInput
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
        .replace(/'/g, '"')
        .replace(/,(\s*[}\]])/g, '$1');

      const parsed = JSON.parse(formattedInput);
      const prettyJson = JSON.stringify(parsed, null, 2);
      setJsonInput(prettyJson);
      setError(null);
    } catch (err) {
      setError("Could not format JSON. Please check the syntax.");
    }
  };

  const handlePreview = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError(null);
      setSelectedPath([]);
    } catch (err) {
      setError("Invalid JSON format");
      setParsedJson(null);
    }
  };

  const getAccessPath = (path: string[]) => {
    return path.map(key => 
      /^\d+$/.test(key) ? `[${key}]` : `.${key}`
    ).join("").replace(/^\./, "");
  };

  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    const textToCopy = getAccessPath(selectedPath)
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Card className="p-4">
          <Textarea
            placeholder="Paste your JSON here..."
            className="min-h-[400px] font-mono"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            />
            
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={formatJson}
            >
              <FileJson className="w-4 h-4 mr-2 neon-icon" />
              Format
            </Button>
            <Button
              className="flex-1"
              onClick={handlePreview}
              disabled={!jsonInput}
            >
              <Eye className="w-4 h-4 mr-2 neon-icon" />
              Preview
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {parsedJson && (
          <>
            <Card className="p-4 bg-background">
              <ScrollArea className="h-[400px]">
                <TreeNode
                  data={parsedJson}
                  path={[]}
                  onSelect={setSelectedPath}
                  selectedPath={selectedPath}
                />
              </ScrollArea>
            </Card>

            {selectedPath.length > 0 && (
              <>
                <h3>Selected path</h3>
              <Card className="p-4">
                <div className="flex items-center gap-2 text-sm justify-between">
                  <div className="flex gap-2 items-center">
                    
                  <Code className="w-4 h-4 neon-icon" />
                  <code className="font-mono">
                    {getAccessPath(selectedPath)} 
                  </code>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
                  >
                    {copied ? <IconCheck size={14} className="neon-icon" /> : <IconCopy size={14} className="neon-icon" />}
                  </button>
                </div>
              </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}