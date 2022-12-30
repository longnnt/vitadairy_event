import { Container, Paper } from "@mui/material";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Page from "src/common/components/Page";
import { BREADCUMBS } from "src/common/constants/common.constants";
import useSettings from "src/common/hooks/useSettings";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import CreatePrizeContainer from "./components/CreatePrizeContainer";

export default function CreateEventPrizeQ1() {
    const {themeStretch} = useSettings();

    return (
        <>
            <Page title={BREADCUMBS.EVENT_Q1}>
                <Container 
                    maxWidth={themeStretch ?  'sm': 'xl'}
                >
                    <HeaderBreadcrumbs 
                        heading={BREADCUMBS.EVENT_PRIZE_CREATE}
                        links={[
                            {
                                name: BREADCUMBS.MANAGE_EVENT
                            },
                            {
                                name: BREADCUMBS.EVENT_PRIZE_LIST,
                                href: PATH_DASHBOARD.eventPrizeQ1.list
                            },
                            {
                                name:  BREADCUMBS.EVENT_PRIZE_CREATE
                            }
                        ]}
                    />

                   <CreatePrizeContainer />
                </Container>
            </Page>
        </>
    )
}