import {FC} from "react";
import {Typography} from "@mui/material";
import Table, {Config} from "../../library/table";
import {Address, query} from "thin-backend";
import TableHeader from "../../library/table/table-head";
import {useQuery} from "thin-backend-react";
import TableRow from "../../library/table/table-row";



const AddressesEditor: FC = () => {
    const addresses = useQuery(query("addresses"))

    const config: ReadonlyArray<Config<Address>> = [{
        key: "address",
        header: "Адрес",
        size: "213px",
        render: (v) => <span>{v.address}</span>
    },{
        key: "time",
        header: "Время",
        size: "1fr",
        render: (v)=> <span>{v.workingTimeFrom}:{v.workingTimeTo}</span>
    },{
        key: "time",
        header: "Время",
        size: "1fr",
        render: (v)=> <span>{v.workingTimeFrom}:{v.workingTimeTo}</span>
    },]

    return <>
        <Typography variant={"h3"}>Редактор адресов</Typography>
        {/*<Crud query={query("addresses")}/>*/}
        <Table config={config}>
            <TableHeader/>
            {addresses?.map(address => <TableRow key={address.id} row={address}/>)}
        </Table>
    </>
}

export default AddressesEditor