import {
    Container,
} from "@mui/material";
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import useTable from 'src/common/hooks/useTable';
import ListPrizeContainer from "./components/ListPrizeContainer";

export default function ListEventPrizeQ1() {
    const { themeStretch } = useSettings();

    

    return (
        <>
            <Page title={'Event Quý 1'}>
                <Container
                    maxWidth={themeStretch ? 'sm' : 'xl'}
                >
                    <ListPrizeContainer />
                </Container>
            </Page>
        </>
    )
}