import {FC} from "react";
import {motion} from "framer-motion"
import Select from "@mui/joy/Select";
import useStoreStoresStorage from "../../../../storage/stores-storage";

const Step2: FC = () => {

    const stores = useStoreStoresStorage(state => state.stores)
    console.log(stores)
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <Select>
            {/*{cities?.map(city => <Option value={city.id}></Option>)}*/}
        </Select>
    </motion.div>
}

export default Step2