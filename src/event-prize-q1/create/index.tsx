import { Container, Paper } from "@mui/material";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Page from "src/common/components/Page";
import useSettings from "src/common/hooks/useSettings";
import { PATH_DASHBOARD } from "src/common/routes/paths";
import CreatePrizeContainer from "./components/CreatePrizeContainer";

export default function CreateEventPrizeQ1() {
    const {themeStretch} = useSettings();

    return (
        <>
            <Page title="Event Quý 1">
                <Container 
                    maxWidth={themeStretch ?  'sm': 'xl'}
                >
                    <HeaderBreadcrumbs 
                        heading="Tạo giải"
                        links={[
                            {
                                name: 'Quản lý event'
                            },
                            {
                                name: 'Quản lý giải',
                                href: PATH_DASHBOARD.eventPrizeQ1.list
                            },
                            {
                                name: 'Tạo giải'
                            }
                        ]}
                    />

                   <CreatePrizeContainer />
                </Container>
            </Page>
        </>
    )
}