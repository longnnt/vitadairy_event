import { Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Page from "src/common/components/Page";
import { BREADCUMBS } from "src/common/constants/common.constants";
import useSettings from "src/common/hooks/useSettings";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { replacePathParams } from "src/common/utils/replaceParams";
import EditPrizeContainer from "./components/EditPrizeContainer";

export default function EditEventPrizeQ1() {
    const { themeStretch } = useSettings();

    const {eventId} = useParams()

    return (
        <>
            <Page title={BREADCUMBS.EVENT_Q1}>
                <Container
                    maxWidth={themeStretch ? 'sm': 'xl'}
                >
                    <HeaderBreadcrumbs 
                        heading={BREADCUMBS.EVENT_PRIZE_EDIT}
                        links={[
                            {
                                name: BREADCUMBS.MANAGE_LIST_EVENT,
                                href: PATH_DASHBOARD.manageEventQuarterOne.list
                            },
                            {
                                name: BREADCUMBS.EVENT_PRIZE_LIST,
                                href: replacePathParams(PATH_DASHBOARD.eventPrizeQ1.list, {eventId: eventId || ''})
                            },
                            {
                                name: BREADCUMBS.EVENT_PRIZE_EDIT
                            }
                        ]}
                    />

                    <EditPrizeContainer />
                </Container>
            </Page>
        </>
    )
}