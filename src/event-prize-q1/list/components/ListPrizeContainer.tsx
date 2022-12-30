import { Button, Stack } from "@mui/material";
import HeaderBreadcrumbs from "src/common/components/HeaderBreadcrumbs";
import Can from "src/common/lib/Can";
import AddIcon from '@mui/icons-material/Add';
import { PATH_DASHBOARD } from "src/common/routes/paths";
import { Link as RouterLink } from 'react-router-dom';
import ListPrizeTable from "./ListPrizeTable";

export default function ListPrizeContainer() {
    return (
        <>
            <HeaderBreadcrumbs
                heading="Danh sách giải"
                links={[
                    {
                        name: 'Quản lý event'
                    },
                    {
                        name: 'Quản lý giải'
                    },
                    {
                        name: 'Danh sách giải'
                    }
                ]}
                action={
                    <Stack direction="row" spacing={'10px'}>
                        <Can do="update" on="all">
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                to={PATH_DASHBOARD.eventPrizeQ1.list}
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