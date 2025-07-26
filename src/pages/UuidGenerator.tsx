import React, { useState, useEffect } from "react";
import { v5 as uuidv5, validate as isValidUUID } from "uuid";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function generateUUIDv5(namespace: string, name: string): string {
  return uuidv5(name, namespace);
}

const UuidGenerator: React.FC = () => {
  const [uuid, setUuid] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [uuidV5, setUuidV5] = useState<string>("");
  const [copiedV5, setCopiedV5] = useState<boolean>(false);
  const [namespace, setNamespace] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [namespaceError, setNamespaceError] = useState<string>("");

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const generateUuidV5 = () => {
    if (namespace && value && isValidUUID(namespace)) {
      const generated = generateUUIDv5(namespace, value);
      setUuidV5(generated);
      setCopiedV5(false);
    }
  };

  const copyToClipboardV5 = async () => {
    try {
      await navigator.clipboard.writeText(uuidV5);
      setCopiedV5(true);
      setTimeout(() => setCopiedV5(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Validate namespace when it changes
  useEffect(() => {
    if (namespace && !isValidUUID(namespace)) {
      setNamespaceError("Namespace must be a valid UUID format");
    } else {
      setNamespaceError("");
    }
  }, [namespace]);

  useEffect(() => {
    generateUuid();
  }, []);

  const isGenerateDisabled = !namespace || !value || !isValidUUID(namespace);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">UUID Generator</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Generate random UUIDs and deterministic UUID v5 for your projects.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* UUID v4 Generator */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">UUID v4 (Random)</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-semibold">Generated UUID</label>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg border border-border">
                <code className="text-sm font-mono break-all">{uuid}</code>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              
              <button
                onClick={generateUuid}
                className="px-4 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 border border-border transition shadow-sm"
              >
                Generate New
              </button>
            </div>
          </div>
        </div>

        {/* UUID v5 Generator */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">UUID v5 (Deterministic)</h2>
          <div className="flex flex-col gap-4">
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <label htmlFor="namespace-input" className="block mb-2 font-semibold cursor-help">Namespace</label>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white dark:bg-zinc-900 border border-border shadow-lg">
                  <div className="flex justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-foreground">Namespace</h4>
                      <p className="text-sm text-foreground">
                        Namespace is a UUID that is used to namespace the UUID
                        v5.
                      </p>
                      <div className="text-muted-foreground text-xs">
                        Example: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <input
                id="namespace-input"
                type="text"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
                placeholder="Enter namespace (e.g., 6ba7b810-9dad-11d1-80b4-00c04fd430c8)"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                  namespaceError ? 'border-red-500' : 'border-border'
                }`}
              />
              {namespaceError && (
                <p className="text-red-500 text-sm mt-1">{namespaceError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="value-input" className="block mb-2 font-semibold">Value</label>
              <input
                id="value-input"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value to hash"
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            
            <button
              onClick={generateUuidV5}
              disabled={isGenerateDisabled}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate UUID v5
            </button>
            
            {uuidV5 && (
              <>
                <div>
                  <label className="block mb-2 font-semibold">
                    Generated UUID v5
                  </label>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg border border-border">
                    <code className="text-sm font-mono break-all">
                      {uuidV5}
                    </code>
                  </div>
                </div>
                
                <button
                  onClick={copyToClipboardV5}
                  className="px-4 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 border border-border transition shadow-sm"
                >
                  {copiedV5 ? "Copied!" : "Copy"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
