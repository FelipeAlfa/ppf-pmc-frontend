"use client";

import { useState } from "react";

interface TextFillProps {
  initialCount?: number;
  initialText?: string;
}

export function TextFill({
  initialCount = 0,
  initialText = "Hello World",
}: TextFillProps) {
  const [text, setText] = useState(initialText);
  const [count, setCount] = useState(initialCount);
  
  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} />
      {[0, 1, 10, 25, 100, 150].map((v, i) => (
        <input
          key={i}
          type="button"
          value={v}
          onClick={() => setCount(v)}
          style={{padding: '0 5px'}}
          disabled={v === count}
        />
      ))}
      {(new Array(count)).fill(0).map((_, i) => (
        <p style={{margin: '16px 0', opacity: .3}} key={i}>{text} x{i + 1}</p>
      ))}
    </div>
  );
}
