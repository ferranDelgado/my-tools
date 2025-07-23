import React, { useState } from "react";

const DEFAULT_JWT =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.JkKWCY39IdWEQttmdqR7VdsvT-_QxheW_eb0S5wr_j83ltux_JDUIXs7a3Dtn3xuqzuhetiuJrWIvy5TzimeCg";
const LOCAL_STORAGE_KEY = "jwt-reader-value";

const parseJwt = (token: string) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    const [header, payload] = parts;
    const decode = (str: string) => JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/")));
    return {
      header: decode(header),
      payload: decode(payload),
    };
  } catch (e: any) {
    throw new Error("Invalid JWT: " + e.message);
  }
};

const JwtReader: React.FC = () => {
  const [jwt, setJwt] = useState(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    return stored !== null ? stored : DEFAULT_JWT;
  });
  const [decoded, setDecoded] = useState<{ header: any; payload: any } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    // Decode JWT on mount
    try {
      const result = parseJwt(jwt);
      setDecoded(result);
      setError("");
    } catch (err: any) {
      setDecoded(null);
      setError(err.message);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, jwt);
    }
  }, [jwt]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJwt(value);
    if (!value.trim()) {
      setDecoded(null);
      setError("");
      return;
    }
    try {
      const result = parseJwt(value.trim());
      setDecoded(result);
      setError("");
    } catch (err: any) {
      setDecoded(null);
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jwt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClear = () => {
    setJwt("");
    setDecoded(null);
    setError("");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">JWT Reader</h1>
        <p className="text-muted-foreground text-base md:text-lg">Paste a JWT token to instantly decode its header and payload. Your input is kept locally for convenience.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 min-h-[60vh]">
        <div className="flex-1">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 h-full flex flex-col border border-border">
            <label htmlFor="jwt-input" className="block mb-2 font-semibold text-lg">JWT Token</label>
            <textarea
              id="jwt-input"
              name="jwt"
              className="w-full h-64 p-3 border-2 border-border rounded-lg font-mono resize-vertical mb-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              value={jwt}
              onChange={handleChange}
              placeholder="Paste your JWT token here..."
              spellCheck={false}
              autoComplete="off"
            />
            <div className="flex gap-3 mt-auto">
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-sm"
                onClick={handleCopy}
              >
                Copy
              </button>
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 border border-border transition shadow-sm"
                onClick={handleClear}
              >
                Clear
              </button>
              {copied && (
                <span className="ml-2 text-green-600 font-semibold self-center animate-fade-in-out">Copied!</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 h-full border border-border flex flex-col">
            <div className="font-semibold mb-4 text-lg">Decoded JWT</div>
            {error ? (
              <div className="text-red-600 font-mono whitespace-pre-wrap bg-red-50 dark:bg-red-950 rounded p-3 border border-red-200 dark:border-red-800">{error}</div>
            ) : decoded ? (
              <>
                <div className="mb-4">
                  <span className="font-bold text-primary">Header</span>
                  <code className="block bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre max-w-full mt-1 border border-border text-left">{JSON.stringify(decoded.header, null, 2)}</code>
                </div>
                <div>
                  <span className="font-bold text-primary">Payload</span>
                  <code className="block bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre max-w-full mt-1 border border-border text-left">{JSON.stringify(decoded.payload, null, 2)}</code>
                  {decoded.payload && (decoded.payload.iat || decoded.payload.exp) && (
                    <div className="mt-4 space-y-1 text-sm">
                      {decoded.payload.iat && (
                        <div>
                          <span className="font-semibold">Issued at:</span> {new Date(decoded.payload.iat * 1000).toUTCString()}
                        </div>
                      )}
                      {decoded.payload.exp && (
                        <div>
                          <span className="font-semibold">Expires at:</span> {new Date(decoded.payload.exp * 1000).toUTCString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">Decoded content will appear here.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JwtReader; 