import Menu from "@/components/layout/menu"
import Footer from "@/components/layout/footer"
import { WhatsAppFab } from "@/components/order/whatsapp-fab"

interface LayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
    return (
        <div>
            <Menu />
            <div>{children}</div>
            <Footer />
            <WhatsAppFab />
        </div>
    )
}
