import {
    Container,
} from "@mui/material";
import Page from 'src/common/components/Page';
import { BREADCUMBS } from "src/common/constants/common.constants";
import useSettings from 'src/common/hooks/useSettings';
import { getCrmTransaction, getGift, getProvince } from "../services";
import ListPrizeContainer from "./components/ListPrizeContainer";

export default function ListEventPrizeQ1() {
    const { themeStretch } = useSettings();

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