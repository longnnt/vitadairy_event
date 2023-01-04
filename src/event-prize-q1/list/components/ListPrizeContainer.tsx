import { Button, Stack } from "@mui/material";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Can from "src/common/lib/Can";
import AddIcon from '@mui/icons-material/Add';
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { Link as RouterLink, useParams } from 'react-router-dom';
import ListPrizeTable from "./ListPrizeTable";
import { BREADCUMBS } from "src/common/constants/common.constants";
import { replacePathParams } from "src/common/utils/replaceParams";

export default function ListPrizeContainer() {
    const params = useParams();
    const eventId = params?.eventId || '';
    
    return (
        <>
            <HeaderBreadcrumbs
                heading={BREADCUMBS.EVENT_PRIZE_LIST}
                links={[
                    {
                        name: BREADCUMBS.MANAGE_EVENT
                    },
                    {
                        name: BREADCUMBS.EVENT_PRIZE_LIST
                    },
                    {
                        name: BREADCUMBS.EVENT_PRIZE_LIST
                    }
                ]}
                action={
                    <Stack direction="row" spacing={'10px'}>
                        <Can do="update" on="all">
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                to={replacePathParams(PATH_DASHBOARD.eventPrizeQ1.create, {eventId: eventId})}
                                component={RouterLink}
                            >
                                Tạo mới
                            </Button>
                        </Can>
                    </Stack>
                }
            />

            <ListPrizeTable />
        </>
    )
}