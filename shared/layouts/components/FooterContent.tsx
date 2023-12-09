import useTrans from "@/hooks/useTrans";
import { Layout } from "antd";
const { Footer } = Layout;


const FooterContent = () => {
    const { trans } = useTrans()
    return (
        <Footer style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <p>{`${trans.common.copyRight} ©${new Date().getFullYear()} ${trans.common.createBy}`}</p>
            <a target='_blank' href='#' className="font-bold">{trans.common.pageNGSD}</a>
        </Footer>
    );
}

export default FooterContent;