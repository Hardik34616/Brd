"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductWorkspace from "@/components/product/ProductWorkspace";
function NewContent() { const params = useSearchParams(); const value = params.get("mode"); const mode = value === "text" || value === "upload" || value === "chat" ? value : "voice"; return <ProductWorkspace initialMode={mode} />; }
export default function NewPage() { return <Suspense fallback={<ProductWorkspace initialMode="voice" />}><NewContent /></Suspense>; }
