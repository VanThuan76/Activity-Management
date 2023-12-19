import useTrans from "@/hooks/useTrans";
import { Layout } from "antd";
const { Footer } = Layout;


const FooterContent = () => {
    const { trans } = useTrans()
    return (
        <Footer style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <p>{`${trans.common.copyRight} ©${new Date().getFullYear()} ${trans.common.createBy} HUST Volunteer`}</p>
            <a target='_blank' href='/' className="font-bold">Trang chủ</a>
        </Footer>
    );
}

export default FooterContent;