import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { GatewayRedirect } from "@/components/payment/gateway-redirect"

export const metadata: Metadata = {
    title: "انتقال به درگاه پرداخت",
    robots: { index: false, follow: false },
    referrer: "origin",
}

const AUTHORITY_PATTERN = /^[AS][0-9A-Za-z]{30,40}$/

export default async function PayPage({ params }: { params: Promise<{ authority: string }> }) {
    const { authority } = await params
    if (!AUTHORITY_PATTERN.test(authority)) notFound()

    const host = authority.startsWith("S") ? "sandbox.zarinpal.com" : "www.zarinpal.com"
    return <GatewayRedirect url={`https://${host}/pg/StartPay/${authority}`} />
}
