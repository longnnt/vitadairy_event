import {
    Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Page from 'src/common/components/Page';
import { BREADCUMBS } from "src/common/constants/common.constants";
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { getCrmTransaction, getGift, getProvince } from "../services";
import ListPrizeContainer from "./components/ListPrizeContainer";

export default function ListEventPrizeQ1() {
    const { themeStretch } = useSettings();

    const params = useParams();
    const navigate = useNavigate()
    const eventId = params?.eventId || '';

    if(eventId) {
        navigate(PATH_DASHBOARD.manageEventQuarterOne.list)
    }

    return (
        <>
            <Page title={BREADCUMBS.EVENT_Q1}>
                <Container
                    maxWidth={themeStretch ? 'sm' : 'xl'}
                >
                    <ListPrizeContainer />
                </Container>
            </Page>
        </>
    )
}